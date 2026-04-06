import { Router } from "express"
import { login, register } from "../controllers/authController"
import { verifyEmail } from "../controllers/authController"

const router = Router()

router.post("/login", login)
router.post("/register", register)
router.get("/verify/:token", verifyEmail)

export default router