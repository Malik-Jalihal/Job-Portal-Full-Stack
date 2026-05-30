import express from 'express'
import { applyForJob, getUserData, getUserJobApplications, updateUserResume } from '../controllers/userController.js'
import upload from '../config/multer.js'
import { protectUser } from '../middleware/userAuthMiddleware.js'


const router = express.Router()

// Get user Data (protected)
router.get('/user-data', protectUser, getUserData)

// Apply for a job (protected)
router.post('/apply', protectUser, applyForJob)

// Get applied jobs data (protected)
router.get('/applications', protectUser, getUserJobApplications)

// Update user profile (resume) (protected)
router.post('/update-resume', protectUser, upload.single('resume'), updateUserResume)

export default router;