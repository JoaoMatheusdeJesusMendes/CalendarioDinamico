import { createRouter, createWebHistory } from "vue-router"

import DayView from "@/presentation/components/calendar/views/CalendarDayView.vue"
import WeekView from "@/presentation/components/calendar/views/CalendarWeekView.vue"
import MonthView from "@/presentation/components/calendar/views/CalendarMonthView.vue"
import YearView from "@/presentation/components/calendar/views/CalendarYearView.vue"

import LandingPage from "@/presentation/pages/LandingPage.vue"
import LoginPage from "@/presentation/pages/LoginPage.vue"
import RegisterPage from "@/presentation/pages/RegisterPage.vue"
import CreateTaskPage from "@/presentation/pages/CreateTaskPage.vue"

import { isAuthenticated } from "@/auth/auth"

const router = createRouter({
  history: createWebHistory(),
  routes: [

    {
      path: "/",
      component: LandingPage
    },

    {
      path: "/login",
      component: LoginPage
    },

    {
      path: "/register",
      component: RegisterPage
    },
    {
      path:"/task/create",
      name:"createTask",
      component:CreateTaskPage,
      meta:{ requiresAuth:true }
    },
    {
      path: "/day/:date",
      name: "day",
      component: DayView,
      meta: { requiresAuth: true }
    },
    {
      path: "/week/:date",
      name: "week",
      component: WeekView,
      meta: { requiresAuth: true }
    },
    {
      path: "/month/:year/:month",
      name: "month",
      component: MonthView,
      meta: { requiresAuth: true }
    },
    {
      path: "/year/:year",
      name: "year",
      component: YearView,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to) => {

  if (to.meta.requiresAuth && !isAuthenticated()) {
    return "/login"
  }

})

export default router