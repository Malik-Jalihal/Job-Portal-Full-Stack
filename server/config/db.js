import mongoose from "mongoose";

// Function to connect to the MongoDB database
const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log('Database Connected'))
    mongoose.connection.on('error', (error) => console.error('Database Error:', error))
    mongoose.connection.on('disconnected', () => console.log('Database Disconnected'))

    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI is not defined in environment variables')
    }

    await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    })

}

export default connectDB