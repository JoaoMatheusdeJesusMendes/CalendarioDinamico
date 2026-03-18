import { Router } from "express"
import { createTask, getTasks, getTaskById, updateTask } from "../controllers/taskController"
import { authMiddleware } from "../middleware/authMiddleware"

const router = Router()

router.post("/", authMiddleware, createTask)
router.get("/", authMiddleware, getTasks)
router.get("/:id", authMiddleware, getTaskById)
router.put("/:id", authMiddleware, updateTask)

export default router