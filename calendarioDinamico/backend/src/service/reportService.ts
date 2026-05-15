import ExcelJS from "exceljs"
import fs from "fs"
import path from "path"

import Task from "../models/Task"

export async function generateUserReport( user: any, referenceDate?: Date) 
{
  const workbook = new ExcelJS.Workbook()

  const sheet = workbook.addWorksheet("Semanal")

  sheet.columns = [
    { header: "Dia", key: "day", width: 20 },
    { header: "Pontos", key: "points", width: 15 }
  ]

  const today = referenceDate || new Date()

  const startOfWeek = new Date(today)

  const day = startOfWeek.getDay()

  const diff = day === 0 ? -6 : 1 - day

  startOfWeek.setDate(startOfWeek.getDate() + diff)

  startOfWeek.setHours(0, 0, 0, 0)

  const endOfWeek = new Date(startOfWeek)

  endOfWeek.setDate(endOfWeek.getDate() + 7)

  const tasks = await Task.find({
    userId: user._id,
    status: "done",
    completedAt: {
      $exists: true,
      $gte: startOfWeek,
      $lt: endOfWeek
    }
  })

  const pointsMap: Record<string, number> = {}

  tasks.forEach(task => {
    const date = new Date(task.completedAt!)
    const key = formatKey(date)

    if (!pointsMap[key]) {
      pointsMap[key] = 0
    }

    pointsMap[key] += task.points || 0
  })

  const weekDays = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo"
  ]

  let total = 0

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek)

    currentDate.setDate(startOfWeek.getDate() + i)

    const key = formatKey(currentDate)

    const points = pointsMap[key] || 0

    sheet.addRow({
      day: weekDays[i],
      points
    })

    total += points
  }

  sheet.addRow([])

  sheet.addRow({
    day: "TOTAL",
    points: total
  })

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

function formatKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

export async function generateMonthlyReport(
  user: any,
  referenceDate?: Date
) {
  const workbook = new ExcelJS.Workbook()

  const today = referenceDate || new Date()

  const year = today.getFullYear()
  const month = today.getMonth()

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ]

  const sheet = workbook.addWorksheet("Mensal")

  sheet.columns = [
    { header: "Dia", key: "day", width: 20 },
    { header: "Pontos", key: "points", width: 15 }
  ]

  sheet.addRow([
    `Relatório Mensal - ${monthNames[month]} ${year}`
  ])

  sheet.addRow([])

  const startOfMonth = new Date(year, month, 1)
  const endOfMonth = new Date(year, month + 1, 1)

  const tasks = await Task.find({
    userId: user._id,
    status: "done",
    completedAt: {
      $exists: true,
      $gte: startOfMonth,
      $lt: endOfMonth
    }
  })

  const pointsMap: Record<string, number> = {}

  tasks.forEach(task => {
    const date = new Date(task.completedAt!)
    const key = formatKey(date)

    if (!pointsMap[key]) {
      pointsMap[key] = 0
    }

    pointsMap[key] += task.points || 0
  })

  const daysInMonth = new Date(year, month + 1, 0).getDate()

  let total = 0

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(year, month, day)

    const key = formatKey(currentDate)

    const formattedDate =
      currentDate.toLocaleDateString("pt-BR")

    const points = pointsMap[key] || 0

    sheet.addRow({
      day: formattedDate,
      points
    })

    total += points
  }

  sheet.addRow([])

  sheet.addRow({
    day: "TOTAL",
    points: total
  })

  const reportsDir = path.resolve("reports")

  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir)
  }

  const filePath = path.join(
    reportsDir,
    `monthly-report-${user._id}.xlsx`
  )

  await workbook.xlsx.writeFile(filePath)

  return filePath
}

export async function generateYearlyReport( user: any, referenceDate?: Date) 
{
  const workbook = new ExcelJS.Workbook()

  const sheet = workbook.addWorksheet("Anual")

  const today = referenceDate || new Date()

  const year = today.getFullYear()

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ]

  sheet.columns = [
    { header: "Dia", key: "day", width: 20 },
    { header: "Pontos", key: "points", width: 15 }
  ]

  sheet.addRow([
    `RELATÓRIO ANUAL - ${year}`
  ])

  sheet.addRow([])

  const startOfYear = new Date(year, 0, 1)
  const endOfYear = new Date(year + 1, 0, 1)

  const tasks = await Task.find({
    userId: user._id,
    status: "done",
    completedAt: {
      $exists: true,
      $gte: startOfYear,
      $lt: endOfYear
    }
  })

  const pointsMap: Record<string, number> = {}

  tasks.forEach(task => {
    const date = new Date(task.completedAt!)
    const key = formatKey(date)

    if (!pointsMap[key]) {
      pointsMap[key] = 0
    }

    pointsMap[key] += task.points || 0
  })

  let yearlyTotal = 0

  for (let month = 0; month < 12; month++) {
    sheet.addRow([
      monthNames[month].toUpperCase()
    ])

    const daysInMonth = new Date(
      year,
      month + 1,
      0
    ).getDate()

    let monthTotal = 0

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(
        year,
        month,
        day
      )

      const key = formatKey(currentDate)

      const formattedDate =
        currentDate.toLocaleDateString("pt-BR")

      const points = pointsMap[key] || 0

      sheet.addRow({
        day: formattedDate,
        points
      })

      monthTotal += points
      yearlyTotal += points
    }

    sheet.addRow({
      day: `TOTAL ${monthNames[month].toUpperCase()}`,
      points: monthTotal
    })

    sheet.addRow([])
  }

  sheet.addRow([])

  sheet.addRow({
    day: "TOTAL ANUAL",
    points: yearlyTotal
  })

  const reportsDir = path.resolve("reports")

  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir)
  }

  const filePath = path.join(
    reportsDir,
    `yearly-report-${user._id}.xlsx`
  )

  await workbook.xlsx.writeFile(filePath)

  return filePath
}