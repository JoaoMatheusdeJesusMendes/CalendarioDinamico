<script setup lang="ts">

import { useRouter, useRoute } from "vue-router"
import { useCalendarStore } from "@/stores/calendarStore"

const router = useRouter()
const route = useRoute()
const calendarStore = useCalendarStore()

function formatDate(date: Date) {

  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")

  return `${y}-${m}-${d}`
}

function goToDay() {

  const date = calendarStore.selectedDate

  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")

  router.push(`/day/${y}-${m}-${d}`)

}

function goToWeek() {

  const date = calendarStore.currentDate

  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")

  router.push(`/week/${y}-${m}-${d}`)

}

function goToMonth() {

  const date = calendarStore.currentDate

  router.push({
    name: "month",
    params: {
      year: date.getFullYear(),
      month: date.getMonth() + 1
    }
  })

}

function goToYear() {

  const year = new Date().getFullYear()

  router.push(`/year/${year}`)

}

function parseDate(dateStr: string) {

  const [year, month, day] = dateStr.split("-").map(Number)

  return new Date(year, month - 1, day)

}

function previous() {

  if (route.name === "day") {

    const date = parseDate(route.params.date as string)

    date.setDate(date.getDate() - 1)

    router.push(`/day/${formatDate(date)}`)

  }

  else if (route.name === "week") {

    const date = parseDate(route.params.date as string)

    date.setDate(date.getDate() - 7)

    router.push(`/week/${formatDate(date)}`)

  }

  else if (route.name === "month") {

    let year = Number(route.params.year)
    let month = Number(route.params.month)

    month--

    if (month < 1) {
      month = 12
      year--
    }

    router.push(`/month/${year}/${month}`)

  }

  else if (route.name === "year") {

    const year = Number(route.params.year)

    router.push(`/year/${year - 1}`)

  }

}

function next() {

  if (route.name === "day") {

    const date = parseDate(route.params.date as string)

    date.setDate(date.getDate() + 1)

    router.push(`/day/${formatDate(date)}`)

  }

  else if (route.name === "week") {

    const date = parseDate(route.params.date as string)

    date.setDate(date.getDate() + 7)

    router.push(`/week/${formatDate(date)}`)

  }

  else if (route.name === "month") {

    let year = Number(route.params.year)
    let month = Number(route.params.month)

    month++

    if (month > 12) {
      month = 1
      year++
    }

    router.push(`/month/${year}/${month}`)

  }

  else if (route.name === "year") {

    const year = Number(route.params.year)

    router.push(`/year/${year + 1}`)

  }

}

</script>

<template>

<div class="calendar-header">

<button @click="previous">◀</button>

<button @click="goToDay">Dia</button>
<button @click="goToWeek">Semana</button>
<button @click="goToMonth">Mês</button>
<button @click="goToYear">Ano</button>

<button @click="next">▶</button>

</div>

</template>

<style scoped>

.view-switcher{
display:flex;
gap:10px;
margin-bottom:20px;
}

button{
padding:8px 12px;
border:1px solid #ccc;
border-radius:6px;
cursor:pointer;
}

</style>