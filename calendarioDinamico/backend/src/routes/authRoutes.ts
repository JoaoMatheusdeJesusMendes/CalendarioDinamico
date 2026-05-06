import { Router } from "express"
import { forgotPassword, login, register, resetPassword } from "../controllers/authController"
import { verifyEmail } from "../controllers/authController"

const router = Router()

router.post("/login", login)
router.post("/register", register)
router.get("/verify/:token", verifyEmail)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)

export default router