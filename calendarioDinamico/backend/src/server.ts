import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { startDailyReminder } from "./service/dailyReminderService"
import { startWeeklyReport } from "./service/weeklyReportService"
import { startMonthlyReport } from "./service/monthlyReportService"
import { startYearlyReport  } from "./service/yearlyReportService"

import { connectDB } from "./config/db"

import authRoutes from "./routes/authRoutes"
import taskRoutes from "./routes/taskRoutes"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

connectDB()
startDailyReminder()
startWeeklyReport()
startMonthlyReport()
startYearlyReport()

app.use("/auth", authRoutes)
app.use("/tasks", taskRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
