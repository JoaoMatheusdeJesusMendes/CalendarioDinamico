import type { CalendarDay } from "../models/CalendarDay"

export class CalendarService {

  generateMonth(year: number, month: number): CalendarDay[] {

    const days: CalendarDay[] = []
    const date = new Date(year, month, 1)

    while (date.getMonth() === month) {

      days.push({
        date: new Date(date),
        tasks: [],
        totalPoints: 0
      })

      date.setDate(date.getDate() + 1)
    }

    return days
  }

}