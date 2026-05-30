import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js'
import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from './config/cloudinary.js'
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { clerkMiddleware } from '@clerk/express'


// Initialize Express
const app = express()

// Connect to database
try {
  await connectDB()
  console.log('✓ Database connected successfully')
} catch (error) {
  console.error('✗ Database connection failed:', error.message)
  process.exit(1)
}

try {
  await connectCloudinary()
  console.log('✓ Cloudinary configured successfully')
} catch (error) {
  console.error('✗ Cloudinary configuration failed:', error.message)
}

// Middlewares
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

// Routes
app.get('/', (req, res) => res.send("API Working"))
app.post('/webhooks', clerkWebhooks)
app.use('/api/company', companyRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/users', userRoutes)

// Setup Sentry error handler after routes
Sentry.setupExpressErrorHandler(app);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err)
  const status = err.status || 500
  const message = err.message || 'Internal Server Error'
  res.status(status).json({ success: false, message, error: process.env.NODE_ENV === 'development' ? err : {} })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

// Port
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})