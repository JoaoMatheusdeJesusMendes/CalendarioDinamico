import { Router } from "express"
import { getProfile, updateProfile, generateReport, getPerformance } from "../controllers/userController"
import { authMiddleware } from "../middleware/authMiddleware"

const router = Router()

router.get("/profile", authMiddleware, getProfile)
router.put("/profile", authMiddleware, updateProfile)
router.post("/generate-report", authMiddleware, generateReport)
router.get("/performance", authMiddleware, getPerformance)

export default router