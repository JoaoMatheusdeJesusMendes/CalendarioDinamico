<script setup lang="ts">

import { computed } from "vue"
import { useCalendarStore } from "../../../../stores/calendarStore"

const calendarStore = useCalendarStore()

function getStartOfWeek(date: Date) {

  const start = new Date(date)
  const day = start.getDay()

  // semana começando segunda
  const diff = day === 0 ? -6 : 1 - day

  start.setDate(start.getDate() + diff)

  return start
}

const weekDays = computed(() => {

  const start = getStartOfWeek(calendarStore.currentDate)

  const days = []

  for (let i = 0; i < 7; i++) {

    const date = new Date(start)
    date.setDate(start.getDate() + i)

    days.push({
      date,
      points: 0
    })

  }

  return days
})

</script>

<template>

<div class="week-view">

  <div
    v-for="day in weekDays"
    :key="day.date.toISOString()"
    class="day"
    @click="calendarStore.selectDate(day.date)"
  >

    <div class="weekday">
      {{ day.date.toLocaleDateString("pt-BR",{ weekday:"short"}) }}
    </div>

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

.week-view{
display:grid;
grid-template-columns: repeat(7,1fr);
gap:10px;
padding:20px;
}

.day{
border:1px solid #ccc;
padding:10px;
text-align:center;
border-radius:6px;
cursor:pointer;
transition:0.2s;
}

.day:hover{
background:#f5f5f5;
transform:scale(1.03);
}

.weekday{
font-weight:bold;
}

.date{
font-size:18px;
margin-top:5px;
}

.points{
margin-top:8px;
color:goldenrod;
}

</style>