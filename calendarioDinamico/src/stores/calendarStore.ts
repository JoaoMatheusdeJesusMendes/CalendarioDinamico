import router from "@/router"
import { defineStore } from "pinia"

export type CalendarView = "day" | "week" | "month" | "year"

export const useCalendarStore = defineStore("calendar", {

    state: () => ({
    currentDate: new Date(),
    selectedDate: new Date(),

    view: "month" as CalendarView,

    days: [] as {
        date: Date
        totalPoints: number
    }[]
    }),

  actions: {

    setView(view: CalendarView) {
      this.view = view
    },
    
    selectDate(date: Date) {

    this.currentDate = date

    const formattedDate = date.toISOString().split("T")[0]

    router.push(`/day/${formattedDate}`)

    },

    next() {

      const date = new Date(this.currentDate)

      switch (this.view) {
        case "day":
          date.setDate(date.getDate() + 1)
          break

        case "week":
          date.setDate(date.getDate() + 7)
          break

        case "month":
          date.setMonth(date.getMonth() + 1)
          break

        case "year":
          date.setFullYear(date.getFullYear() + 1)
          break
      }

      this.currentDate = date
    },

    previous() {

      const date = new Date(this.currentDate)

      switch (this.view) {
        case "day":
          date.setDate(date.getDate() - 1)
          break

        case "week":
          date.setDate(date.getDate() - 7)
          break

        case "month":
          date.setMonth(date.getMonth() - 1)
          break

        case "year":
          date.setFullYear(date.getFullYear() - 1)
          break
      }

      this.currentDate = date
    }
  }

})