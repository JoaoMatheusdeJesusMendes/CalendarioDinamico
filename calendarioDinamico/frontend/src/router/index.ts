import { createRouter, createWebHistory } from "vue-router"

import DayView from "@/presentation/components/calendar/views/CalendarDayView.vue"
import WeekView from "@/presentation/components/calendar/views/CalendarWeekView.vue"
import MonthView from "@/presentation/components/calendar/views/CalendarMonthView.vue"
import YearView from "@/presentation/components/calendar/views/CalendarYearView.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: () => {

        const today = new Date()

        return `/month/${today.getFullYear()}/${today.getMonth() + 1}`

      }
    },
    {
      path: "/day/:date",
      name: "day",
      component: DayView
    },
    {
      path: "/week/:date",
      name: "week",
      component: WeekView
    },
    {
      path: "/month/:year/:month",
      name: "month",
      component: MonthView
    },
    {
      path: "/year/:year",
      name: "year",
      component: YearView
    }
  ]
})

export default router