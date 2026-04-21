import express from "express"
import {register, login, logout, getProfile} from "../controllers/authController.js"
import {protect} from "../middleware/authMiddleware.js"

const router = express.Router()

// 1. Create Account
router.post('/register', register);

// 2. Sign In
router.post('/login', login);

// 3. Sign Out (Clears the cookie/token)
router.post('/logout', logout);

// 4. Get User Data (Protected - only for logged-in users)
router.get('/profile', protect, getProfile);

export default router