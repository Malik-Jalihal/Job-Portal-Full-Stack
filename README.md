# 🎯 Job Portal - Full Stack Application

A comprehensive full-stack job portal application built with modern web technologies. This platform enables companies to post job listings and job seekers to discover and apply for opportunities.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [File Upload](#file-upload)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

---

## 🌟 Overview

Job Portal is a modern, full-stack web application that connects job seekers with recruiters. The platform provides a seamless experience for both job applicants and recruiters to manage job postings, applications, and company profiles.

### Key Capabilities:

- **For Job Seekers**: Browse jobs, apply to positions, track applications
- **For Recruiters**: Post job listings, manage applications, view applicant details
- **For Admins**: Manage companies, moderate content, view platform analytics

---

## ✨ Features

### Job Seeker Features

- 🔍 Search and filter job listings by title, location, experience level, and salary range
- 📝 Apply for jobs with cover letter and resume
- 📊 Track application status (Applied, Shortlisted, Rejected, Accepted)
- 👤 Manage user profile and resume
- 🔔 Receive notifications on application updates
- ⭐ Save favorite job listings (future enhancement)

### Recruiter Features

- 📢 Post new job listings with detailed job descriptions
- 📋 View all job postings and applications
- 👥 Manage applicants and filter by status
- 📧 Download applicant resumes and documents
- 📊 Track recruitment progress with analytics
- 🏢 Manage company profile and branding

### General Features

- 🔐 Secure authentication with Clerk
- 📱 Responsive design for mobile and desktop
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast performance with Vite
- 🐛 Error tracking with Sentry
- 🖼️ Image upload with Cloudinary integration
- 🌍 CORS enabled for cross-origin requests

---

## 🛠️ Tech Stack

### Frontend

| Technology     | Purpose          | Version |
| -------------- | ---------------- | ------- |
| React          | UI Library       | 18.3.1  |
| Vite           | Build Tool       | 6.0.1   |
| React Router   | Routing          | 7.0.1   |
| Tailwind CSS   | Styling          | 3.4.15  |
| Axios          | HTTP Client      | 1.7.9   |
| Clerk          | Authentication   | 5.17.1  |
| Quill          | Rich Text Editor | 2.0.3   |
| React Toastify | Notifications    | 10.0.6  |
| Moment.js      | Date Formatting  | 2.30.1  |

### Backend

| Technology | Purpose          | Version    |
| ---------- | ---------------- | ---------- |
| Node.js    | Runtime          | Latest LTS |
| Express.js | Web Framework    | 4.21.1     |
| MongoDB    | Database         | Latest     |
| Mongoose   | ODM              | 8.8.3      |
| Clerk      | Authentication   | 1.3.21     |
| Bcrypt     | Password Hashing | 5.1.1      |
| JWT        | Token Generation | 9.0.2      |
| Cloudinary | Image Storage    | 2.5.1      |
| Multer     | File Upload      | 1.4.5      |
| Sentry     | Error Tracking   | 8.42.0     |
| Nodemon    | Development      | 3.1.7      |
| CORS       | Cross-Origin     | 2.8.5      |

---

## 📁 Project Structure

```
job-portal/
├── client/                          # Frontend Application
│   ├── src/
│   │   ├── components/             # Reusable React Components
│   │   │   ├── AppDownload.jsx     # App Download Section
│   │   │   ├── Footer.jsx          # Footer Component
│   │   │   ├── Hero.jsx            # Hero Section
│   │   │   ├── JobCard.jsx         # Individual Job Card
│   │   │   ├── JobListing.jsx      # Job Listings Container
│   │   │   ├── Loading.jsx         # Loading Spinner
│   │   │   ├── Navbar.jsx          # Navigation Bar
│   │   │   └── RecruiterLogin.jsx  # Recruiter Login Modal
│   │   ├── pages/                  # Page Components (Route Pages)
│   │   │   ├── Home.jsx            # Home Page
│   │   │   ├── ApplyJob.jsx        # Job Application Page
│   │   │   ├── Applications.jsx    # View Applications Page
│   │   │   ├── Dashboard.jsx       # Recruiter Dashboard
│   │   │   ├── AddJob.jsx          # Add New Job Page
│   │   │   ├── ManageJobs.jsx      # Manage Jobs Page
│   │   │   └── ViewApplications.jsx# View Job Applications
│   │   ├── context/                # React Context
│   │   │   └── AppContext.jsx      # Global App Context
│   │   ├── assets/                 # Static Assets
│   │   │   └── assets.js           # Asset URLs
│   │   ├── App.jsx                 # Main App Component
│   │   ├── main.jsx                # Entry Point
│   │   └── index.css               # Global Styles
│   ├── public/                     # Public Static Files
│   ├── package.json                # Dependencies
│   ├── vite.config.js              # Vite Configuration
│   ├── tailwind.config.js          # Tailwind Configuration
│   ├── postcss.config.js           # PostCSS Configuration
│   ├── eslint.config.js            # ESLint Configuration
│   ├── vercel.json                 # Vercel Deployment Config
│   └── index.html                  # HTML Template
│
├── server/                          # Backend Application
│   ├── config/                     # Configuration Files
│   │   ├── db.js                   # MongoDB Connection
│   │   ├── cloudinary.js           # Cloudinary Setup
│   │   ├── instrument.js           # Sentry Instrumentation
│   │   └── multer.js               # File Upload Configuration
│   ├── controllers/                # Business Logic
│   │   ├── companyController.js    # Company Operations
│   │   ├── jobController.js        # Job Operations
│   │   ├── userController.js       # User Operations
│   │   └── webhooks.js             # Clerk Webhooks
│   ├── models/                     # Database Models (Mongoose Schemas)
│   │   ├── Company.js              # Company Schema
│   │   ├── Job.js                  # Job Schema
│   │   ├── JobApplication.js       # Application Schema
│   │   └── User.js                 # User Schema
│   ├── routes/                     # API Routes
│   │   ├── companyRoutes.js        # Company Endpoints
│   │   ├── jobRoutes.js            # Job Endpoints
│   │   └── userRoutes.js           # User Endpoints
│   ├── middleware/                 # Express Middleware
│   │   └── authMiddleware.js       # Authentication Middleware
│   ├── utils/                      # Utility Functions
│   │   └── generateToken.js        # JWT Token Generation
│   ├── server.js                   # Express Server Entry
│   ├── package.json                # Dependencies
│   ├── vercel.json                 # Vercel Deployment Config
│   └── .env.example                # Environment Variables Template
│
└── README.md                        # This File
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v6.0.0 or higher) - Comes with Node.js
- **MongoDB** - [Installation Guide](https://docs.mongodb.com/manual/installation/)
  - Or use MongoDB Atlas (Cloud): [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** - VS Code recommended

### External Accounts Required:

- **Clerk** - For authentication: [Clerk.com](https://clerk.com)
- **Cloudinary** - For image storage: [Cloudinary.com](https://cloudinary.com)
- **Sentry** - For error tracking: [Sentry.io](https://sentry.io)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/job-portal.git
cd job-portal
```

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../server
npm install
```

---

## ⚙️ Configuration

### Frontend Configuration (.env)

Create a `.env` file in the `client` directory:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:5000/api
```

**Getting Clerk Keys:**

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application
3. Copy the Publishable Key
4. Paste it in your `.env` file

### Backend Configuration (.env)

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/job-portal
JWT_SECRET=your_jwt_secret_key_here
CLERK_SECRET_KEY=your_clerk_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
SENTRY_DSN=your_sentry_dsn
SVIX_WEBHOOK_SECRET=your_svix_webhook_secret
```

**Getting External Service Keys:**

- **MongoDB**: Use MongoDB Atlas for cloud database
- **Clerk**: From Clerk Dashboard → API Keys
- **Cloudinary**: From Cloudinary Dashboard → Settings → API Keys
- **Sentry**: From Sentry Dashboard → Settings → Projects → Client Keys (DSN)

---

## ▶️ Running the Application

### Development Environment

#### Terminal 1 - Start Backend Server

```bash
cd server
npm run server
```

Backend runs on: `http://localhost:5000`

#### Terminal 2 - Start Frontend Development Server

```bash
cd client
npm run dev
```

Frontend runs on: `http://localhost:5173`

### Production Build

#### Build Frontend

```bash
cd client
npm run build
npm run preview
```

#### Start Backend Production

```bash
cd server
npm start
```

---

## 📚 API Documentation

### Base URL

```
Development: http://localhost:5000/api
Production: https://your-production-url.com/api
```

### Authentication

All API endpoints (except login/register) require:

- Bearer token in Authorization header
- Clerk authentication

### Company Routes

| Method | Endpoint            | Description            | Auth     |
| ------ | ------------------- | ---------------------- | -------- |
| GET    | `/api/company`      | Get company profile    | Required |
| POST   | `/api/company`      | Create company profile | Required |
| PUT    | `/api/company`      | Update company profile | Required |
| POST   | `/api/company/logo` | Upload company logo    | Required |

### Job Routes

| Method | Endpoint              | Description          | Auth     |
| ------ | --------------------- | -------------------- | -------- |
| GET    | `/api/jobs`           | Get all job listings | Optional |
| GET    | `/api/jobs/:id`       | Get specific job     | Optional |
| POST   | `/api/jobs`           | Create new job       | Required |
| PUT    | `/api/jobs/:id`       | Update job           | Required |
| DELETE | `/api/jobs/:id`       | Delete job           | Required |
| POST   | `/api/jobs/apply/:id` | Apply for job        | Required |

### User Routes

| Method | Endpoint                  | Description           | Auth     |
| ------ | ------------------------- | --------------------- | -------- |
| GET    | `/api/users/profile`      | Get user profile      | Required |
| PUT    | `/api/users/profile`      | Update user profile   | Required |
| POST   | `/api/users/resume`       | Upload resume         | Required |
| GET    | `/api/users/applications` | Get user applications | Required |

### Webhook Routes

| Method | Endpoint    | Description            |
| ------ | ----------- | ---------------------- |
| POST   | `/webhooks` | Clerk webhook endpoint |

---

## 🗄️ Database Schema

### User Model

```javascript
{
  clerkId: String (unique),
  email: String,
  firstName: String,
  lastName: String,
  phone: String,
  location: String,
  resume: String (URL),
  bio: String,
  skills: [String],
  experience: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Company Model

```javascript
{
  clerkId: String,
  name: String,
  description: String,
  industry: String,
  website: String,
  email: String,
  phone: String,
  location: String,
  logo: String (URL),
  employees: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Job Model

```javascript
{
  title: String,
  description: String,
  company: ObjectId (ref: Company),
  location: String,
  jobType: String (Full-time, Part-time, Contract),
  experience: String,
  salary: {
    min: Number,
    max: Number
  },
  skills: [String],
  applicants: [ObjectId] (ref: JobApplication),
  status: String (Active, Closed),
  createdAt: Date,
  updatedAt: Date
}
```

### JobApplication Model

```javascript
{
  job: ObjectId (ref: Job),
  applicant: ObjectId (ref: User),
  coverLetter: String,
  resume: String (URL),
  status: String (Applied, Shortlisted, Rejected, Accepted),
  appliedAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Authentication

### How Authentication Works

1. **Clerk Integration**: The app uses Clerk for user authentication
   - Sign up/Sign in via Clerk
   - JWT tokens generated by Clerk
   - Server validates tokens via Clerk middleware

2. **Role-Based Access**
   - **Job Seeker**: Can apply for jobs and view applications
   - **Recruiter**: Can post jobs, manage applications (identified via company setup)
   - **Admin**: Full platform access

3. **Protected Routes**
   - Dashboard (recruiter only)
   - Add Job (recruiter only)
   - Applications (authenticated users only)

---

## 🖼️ File Upload

### Supported File Types

- **Resume/Documents**: PDF, DOC, DOCX (max 5MB)
- **Images**: JPG, PNG, GIF, WebP (max 2MB)

### Upload Process

1. File selected in form
2. Uploaded to Cloudinary
3. URL stored in database
4. File deleted locally

### Cloudinary Integration

- Automatic image optimization
- CDN delivery for fast loading
- Secure URL generation

---

## 🌐 Deployment

### Deploy Frontend (Vercel)

1. Push code to GitHub
2. Connect GitHub to Vercel
3. Set environment variables in Vercel dashboard
4. Vercel auto-deploys on push

```bash
vercel deploy
```

### Deploy Backend (Heroku/Railway/Render)

**Using Heroku:**

```bash
heroku login
heroku create your-app-name
git push heroku main
heroku config:set MONGODB_URI=your_mongodb_uri
```

**Environment Variables to Set:**

- MONGODB_URI
- JWT_SECRET
- CLERK_SECRET_KEY
- CLOUDINARY credentials
- SENTRY_DSN

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository** on GitHub
2. **Clone your fork**: `git clone https://github.com/yourusername/job-portal.git`
3. **Create a branch**: `git checkout -b feature/your-feature-name`
4. **Make changes** and commit: `git commit -m "Add your feature"`
5. **Push to branch**: `git push origin feature/your-feature-name`
6. **Open Pull Request** with description

### Code Guidelines

- Follow ESLint rules
- Use meaningful commit messages
- Add comments for complex logic
- Test your changes before pushing
- Update documentation if needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

### Getting Help

- 📖 Check [Documentation](docs/)
- 🐛 Report bugs in [Issues](../../issues)
- 💬 Start [Discussions](../../discussions)
- 📧 Email: your-email@example.com

### Common Issues

**MongoDB Connection Error**

- Verify MONGODB_URI in .env
- Check IP whitelist in MongoDB Atlas
- Ensure MongoDB server is running

**Clerk Authentication Issues**

- Verify CLERK_PUBLISHABLE_KEY is correct
- Check Clerk dashboard for API keys
- Ensure redirect URLs are configured

**Image Upload Failures**

- Check Cloudinary credentials
- Verify file size limits
- Check file format

---

## 📊 Project Statistics

- **Total Lines of Code**: 10,000+
- **Components**: 10+
- **API Endpoints**: 15+
- **Database Models**: 4
- **Test Coverage**: Ready for implementation

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB University](https://university.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Clerk Documentation](https://clerk.com/docs)

---

## 🚀 Future Enhancements

- [ ] Advanced job search filters
- [ ] Email notifications
- [ ] Saved jobs/favorites
- [ ] User ratings and reviews
- [ ] Video interview integration
- [ ] Payment integration
- [ ] Analytics dashboard
- [ ] Mobile app

---
