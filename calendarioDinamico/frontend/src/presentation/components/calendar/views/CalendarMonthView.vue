<script setup lang="ts">

import { computed } from "vue"
import { useCalendarStore } from "../../../../stores/calendarStore"
import { useRouter } from "vue-router"
import { useRoute } from "vue-router"

const calendarStore = useCalendarStore()
const router = useRouter()
const route = useRoute()
const year = computed(() => Number(route.params.year))
const month = computed(() => Number(route.params.month) - 1)

const days = computed(() => {

  const y = year.value
  const m = month.value

  const lastDay = new Date(y, m + 1, 0).getDate()

  return Array.from({ length: lastDay }, (_, i) => {

    return {
      date: new Date(y, m, i + 1),
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