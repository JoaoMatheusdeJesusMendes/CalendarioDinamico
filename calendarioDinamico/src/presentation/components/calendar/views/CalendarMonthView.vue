<script setup lang="ts">

import { computed } from "vue"
import { useCalendarStore } from "../../../../stores/calendarStore"
import { useRouter } from "vue-router"

const calendarStore = useCalendarStore()
const router = useRouter()

const days = computed(() => {

  const date = calendarStore.currentDate
  const year = date.getFullYear()
  const month = date.getMonth()

  const lastDay = new Date(year, month + 1, 0).getDate()

  return Array.from({ length: lastDay }, (_, i) => {

    return {
      date: new Date(year, month, i + 1),
      points: 0
    }

  })

})

function openDay(date: Date) {

  calendarStore.selectDate(date)

  const formatted = date.toISOString().split("T")[0]

  router.push(`/day/${formatted}`)
}

</script>

<template>

<div class="month-grid">

<div
  v-for="day in days"
  :key="day.date.toISOString()"
  class="day"
  @click="openDay(day.date)"
>

    <div class="date">
      {{ day.date.getDate() }}
    </div>

    <div class="points">
      ⭐ {{ day.points }}
    </div>

  </div>

</div>

</template>

<style scoped>

.month-grid{
display:grid;
grid-template-columns: repeat(7,1fr);
gap:10px;
}

.day{
border:1px solid #ccc;
padding:10px;
min-height:80px;
}

</style>