<script setup lang="ts">

import { ref, computed, onMounted } from "vue"
import { useRoute } from "vue-router"
import { useCalendarStore } from "@/stores/calendarStore"
import CalendarViewSwitcher from "@/presentation/components/calendar/CalendarViewSwitcher.vue"
import { getTasks } from "@/domain/services/taskService"

const route = useRoute()
const calendarStore = useCalendarStore()

function getStartOfWeek(date: Date) {

  const start = new Date(date)
  const day = start.getDay()

  const diff = day === 0 ? -6 : 1 - day

  start.setDate(start.getDate() + diff)

  return start
}

const tasks = ref<any[]>([])

onMounted(async () => {

  const data = await getTasks()

  if (Array.isArray(data)) {
    tasks.value = data
  } else {
    tasks.value = []
  }

})

function formatDate(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")

  return `${y}-${m}-${d}`
}

const pointsByDay = computed(() => {

  const map: Record<string, number> = {}

  tasks.value.forEach(task => {

    if (task.status !== "done") return

    if (!map[task.date]) {
      map[task.date] = 0
    }

    map[task.date] += task.points

  })

  return map
})

const currentDate = computed(() => {

  const dateParam = route.params.date as string
  const [y,m,d] = dateParam.split("-").map(Number)

  return new Date(y, m - 1, d)

})

const totalWeekPoints = computed(() => {
  return Object.values(pointsByDay.value)
    .reduce((sum, points) => sum + points, 0)
})

const weekDays = computed(() => {

  const start = getStartOfWeek(currentDate.value)

  const days = []

  for (let i = 0; i < 7; i++) {

    const date = new Date(start)
    date.setDate(start.getDate() + i)

    days.push({
      date,
      fullDate: formatDate(date)
    })

  }

  return days

})
</script>

<template>

<CalendarViewSwitcher />

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

    <div class="points" v-if="pointsByDay[day.fullDate]">
      ⭐ {{ pointsByDay[day.fullDate] }}
    </div>

  </div>

</div>

<div class="week-total">
  ⭐ Total da semana: {{ totalWeekPoints }}
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