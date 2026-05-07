import ExcelJS from "exceljs"
import fs from "fs"
import path from "path"

import Task from "../models/Task"

export async function generateUserReport(user: any){

  const workbook = new ExcelJS.Workbook()

  const sheet = workbook.addWorksheet("Semanal")

  sheet.columns = [
    { header: "Dia", key: "day", width: 20 },
    { header: "Pontos", key: "points", width: 15 }
  ]

  const today = new Date()

  const startOfWeek = new Date(today)

  const day = startOfWeek.getDay()

  const diff = day === 0 ? -6 : 1 - day

  startOfWeek.setDate(startOfWeek.getDate() + diff)

  startOfWeek.setHours(0,0,0,0)

  const endOfWeek = new Date(startOfWeek)

  endOfWeek.setDate(endOfWeek.getDate() + 7)

  const tasks = await Task.find({

    userId: user._id,

    date: {
      $gte: startOfWeek,
      $lt: endOfWeek
    },

    status: "done"

  })

  const pointsMap: Record<string, number> = {}

  tasks.forEach(task => {

    const date = new Date(task.date)

    const key = date.toLocaleDateString("pt-BR")

    if (!pointsMap[key]) {
      pointsMap[key] = 0
    }

    pointsMap[key] += task.points

  })

  let total = 0

  Object.entries(pointsMap).forEach(([day, points]) => {

    sheet.addRow({
      day,
      points
    })

    total += points

  })

  sheet.addRow([])

  sheet.addRow({
    day: "TOTAL",
    points: total
  })

  // pasta reports
  const reportsDir = path.resolve("reports")

  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir)
  }

  const filePath = path.join(
    reportsDir,
    `report-${user._id}.xlsx`
  )

  await workbook.xlsx.writeFile(filePath)

  return filePath
}