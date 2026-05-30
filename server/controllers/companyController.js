import Company from "../models/Company.js";
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";

// Register a new company
export const registerCompany = async (req, res) => {

    const { name, email, password } = req.body

    const imageFile = req.file;

    if (!name || !email || !password || !imageFile) {
        return res.status(400).json({ success: false, message: "Missing Details" })
    }

    try {

        const companyExists = await Company.findOne({ email })

        if (companyExists) {
            return res.status(400).json({ success: false, message: 'Company already registered' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        const company = await Company.create({
            name,
            email,
            password: hashPassword,
            image: imageUpload.secure_url
        })

        res.json({
            success: true,
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
            },
            token: generateToken(company._id)
        })

    } catch (error) {
        console.error('registerCompany error:', error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// Login Company
export const loginCompany = async (req, res) => {

    const { email, password } = req.body

    try {

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' })
        }

        const company = await Company.findOne({ email })

        if (!company) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' })
        }

        if (await bcrypt.compare(password, company.password)) {

            res.json({
                success: true,
                company: {
                    _id: company._id,
                    name: company.name,
                    email: company.email,
                    image: company.image
                },
                token: generateToken(company._id)
            })

        }
        else {
            res.status(401).json({ success: false, message: 'Invalid email or password' })
        }

    } catch (error) {
        console.error('loginCompany error:', error)
        res.status(500).json({ success: false, message: error.message })
    }

}

// Get Company Data
export const getCompanyData = async (req, res) => {

    try {

        const company = req.company

        if (!company) {
            return res.status(401).json({ success: false, message: 'Company not authenticated' })
        }

        res.json({ success: true, company })

    } catch (error) {
        console.error('getCompanyData error:', error)
        res.status(500).json({ success: false, message: error.message })
    }

}

// Post New Job
export const postJob = async (req, res) => {

    const { title, description, location, salary, level, category } = req.body

    const companyId = req.company?._id

    if (!companyId) {
        return res.status(401).json({ success: false, message: 'Company not authenticated' })
    }

    if (!title || !description || !location) {
        return res.status(400).json({ success: false, message: 'Missing required job details' })
    }

    try {

        const newJob = new Job({
            title,
            description,
            location,
            salary,
            companyId,
            date: Date.now(),
            level,
            category
        })

        await newJob.save()

        res.json({ success: true, newJob })

    } catch (error) {
        console.error('postJob error:', error)
        res.status(500).json({ success: false, message: error.message })

    }


}

// Get Company Job Applicants
export const getCompanyJobApplicants = async (req, res) => {
    try {

        const companyId = req.company?._id

        if (!companyId) {
            return res.status(401).json({ success: false, message: 'Company not authenticated' })
        }

        // Find job applications for the user and populate related data
        const applications = await JobApplication.find({ companyId })
            .populate('userId', 'name image resume')
            .populate('jobId', 'title location category level salary')
            .exec()

        return res.json({ success: true, applications })

    } catch (error) {
        console.error('getCompanyJobApplicants error:', error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// Get Company Posted Jobs
export const getCompanyPostedJobs = async (req, res) => {
    try {

        const companyId = req.company?._id

        if (!companyId) {
            return res.status(401).json({ success: false, message: 'Company not authenticated' })
        }

        const jobs = await Job.find({ companyId })

        // Adding No. of applicants info in data
        const jobsData = await Promise.all(jobs.map(async (job) => {
            const applicants = await JobApplication.find({ jobId: job._id });
            return { ...job.toObject(), applicants: applicants.length }
        }))

        res.json({ success: true, jobsData })

    } catch (error) {
        console.error('getCompanyPostedJobs error:', error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// Change Job Application Status
export const ChangeJobApplicationsStatus = async (req, res) => {

    try {

        const { id, status } = req.body

        if (!id || !status) {
            return res.status(400).json({ success: false, message: 'Application ID and status are required' })
        }

        // Find Job application and update status
        const updated = await JobApplication.findOneAndUpdate({ _id: id }, { status })

        if (!updated) {
            return res.status(404).json({ success: false, message: 'Application not found' })
        }

        res.json({ success: true, message: 'Status Changed' })

    } catch (error) {
        console.error('ChangeJobApplicationsStatus error:', error)
        res.status(500).json({ success: false, message: error.message })

    }
}

// Change Job Visiblity
export const changeVisiblity = async (req, res) => {
    try {

        const { id } = req.body

        if (!id) {
            return res.status(400).json({ success: false, message: 'Job ID is required' })
        }

        const companyId = req.company?._id

        if (!companyId) {
            return res.status(401).json({ success: false, message: 'Company not authenticated' })
        }

        const job = await Job.findById(id)

        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' })
        }

        if (companyId.toString() === job.companyId.toString()) {
            job.visible = !job.visible
        } else {
            return res.status(403).json({ success: false, message: 'Unauthorized' })
        }

        await job.save()

        res.json({ success: true, job })

    } catch (error) {
        console.error('changeVisiblity error:', error)
        res.status(500).json({ success: false, message: error.message })
    }
}