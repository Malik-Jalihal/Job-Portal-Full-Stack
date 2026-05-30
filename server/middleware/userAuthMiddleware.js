// Middleware to protect user routes requiring Clerk authentication
export const protectUser = (req, res, next) => {
    if (!req.auth || !req.auth.userId) {
        return res.status(401).json({ success: false, message: 'Unauthorized - Please login' })
    }
    next()
}
