import Task from "../models/Task"

const weekDays = [
  "Seg",
  "Ter",
  "Qua",
  "Qui",
  "Sex",
  "Sáb",
  "Dom"
]

const monthNames = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez"
]

function formatKey(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function getStartOfWeek(baseDate: Date): Date {
  const date = new Date(baseDate)

  const day = date.getDay()
  const diff = day === 0 ? -6 : 1 - day

  date.setDate(date.getDate() + diff)
  date.setHours(0, 0, 0, 0)

  return date
}

export async function getPerformanceData(
  userId: string,
  type: "weekly" | "monthly" | "yearly",
  date?: string
) {
  const referenceDate = date
    ? new Date(`${date}T12:00:00`)
    : new Date()

  const allTasks = await Task.find({
    userId,
    status: "done"
  })

  const totalPoints = allTasks.reduce(
    (sum, task) => sum + (task.points || 0),
    0
  )

  const completedTasks = allTasks.length

  const activeDaysSet = new Set(
  allTasks
    .filter(task => task.completedAt)
    .map(task =>
      formatKey(new Date(task.completedAt!))
    )
  )

  const activeDays = activeDaysSet.size

  const averagePointsPerDay =
    activeDays > 0
      ? Number((totalPoints / activeDays).toFixed(1))
      : 0

  const summary = {
    totalPoints,
    completedTasks,
    activeDays,
    averagePointsPerDay
  }

  let labels: string[] = []
  let dataValues: number[] = []


  if (type === "weekly") {
    const startOfWeek = getStartOfWeek(referenceDate)
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(endOfWeek.getDate() + 7)

    const tasks = await Task.find({
      userId,
      status: "done",
      completedAt: {
        $gte: startOfWeek,
        $lt: endOfWeek
      }
    })

    const pointsMap: Record<string, number> = {}

    tasks.forEach(task => {
      const key = formatKey(new Date(task.completedAt!))
      pointsMap[key] =
        (pointsMap[key] || 0) + (task.points || 0)
    })

    labels = weekDays
    dataValues = []

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek)
      currentDate.setDate(startOfWeek.getDate() + i)

      const key = formatKey(currentDate)

      dataValues.push(pointsMap[key] || 0)
    }
  }

 else if (type === "monthly") 
  {
    const year = referenceDate.getFullYear()
    const month = referenceDate.getMonth()

    const startOfMonth = new Date(year, month, 1)
    const endOfMonth = new Date(year, month + 1, 1)

    const tasks = await Task.find({
      userId,
      status: "done",
      completedAt: {
        $gte: startOfMonth,
        $lt: endOfMonth
      }
    })

    const firstWeekStart = getStartOfWeek(startOfMonth)

    const lastDayOfMonth = new Date(year, month + 1, 0)

    const totalDays = Math.floor(
      (lastDayOfMonth.getTime() - firstWeekStart.getTime()) /
      (1000 * 60 * 60 * 24)
    ) + 1

    const totalWeeks = Math.ceil(totalDays / 7)

    const weeklyTotals = new Array(totalWeeks).fill(0)

    tasks.forEach(task => {
      const taskDate = new Date(task.completedAt!)
      taskDate.setHours(12, 0, 0, 0)

      const diffInDays = Math.floor(
        (taskDate.getTime() - firstWeekStart.getTime()) /
        (1000 * 60 * 60 * 24)
      )

      const weekIndex = Math.floor(diffInDays / 7)

      if (weekIndex >= 0 && weekIndex < totalWeeks) {
        weeklyTotals[weekIndex] += task.points || 0
      }
    })

    labels = Array.from(
      { length: totalWeeks },
      (_, index) => `Semana ${index + 1}`
    )

    dataValues = weeklyTotals
  }

  else if (type === "yearly") {
    const year = referenceDate.getFullYear()

    const startOfYear = new Date(year, 0, 1)
    const endOfYear = new Date(year + 1, 0, 1)

    const tasks = await Task.find({
      userId,
      status: "done",
      completedAt: {
        $gte: startOfYear,
        $lt: endOfYear
      }
    })

    const pointsPerMonth = new Array(12).fill(0)

    tasks.forEach(task => {
      const month = new Date(task.completedAt!).getMonth()

      pointsPerMonth[month] += task.points || 0
    })

    labels = monthNames
    dataValues = pointsPerMonth
  }

  return {
    summary,
    labels,
    data: dataValues
  }
}