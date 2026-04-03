<script setup lang="ts">

import { computed, ref } from "vue"
import { useCalendarStore } from "../../../../stores/calendarStore"
import { useRouter } from "vue-router"
import { useRoute } from "vue-router"
import CalendarViewSwitcher from "@/presentation/components/calendar/CalendarViewSwitcher.vue"
import { onMounted } from "vue"
import { getTasks } from "@/domain/services/taskService"


const calendarStore = useCalendarStore()
const router = useRouter()
const route = useRoute()
const year = computed(() => Number(route.params.year))
const month = computed(() => Number(route.params.month) - 1)
const tasks = ref<any[]>([])

const days = computed(() => {

  const y = year.value
  const m = month.value

  const lastDay = new Date(y, m + 1, 0).getDate()

  return Array.from({ length: lastDay }, (_, i) => {

    return {
      date: new Date(y, m, i + 1),
      fullDate: formatDate(new Date(y, m, i + 1)),
      points: 0
    }

  })

})

function formatDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

onMounted(async () => {

  const data = await getTasks()

  if (Array.isArray(data)) {
    tasks.value = data
  } else {
    console.error("Erro ao carregar tasks:", data)
    tasks.value = []
  }

})

const pointsByDay = computed(() => {

  const map: Record<string, number> = {}

  tasks.value.forEach(task => {

    if (task.status !== "done") return

    if (!map[task.date]) {
      map[task.date] = 0
    }

    map[task.date] += task.points // Soma por dia

  })

  return map
})

const totalMonthPoints = computed(() => {
  return Object.values(pointsByDay.value)
    .reduce((sum, points) => sum + points, 0)
})

function openDay(date: Date) {

  calendarStore.selectDate(date)

  const formatted = date.toISOString().split("T")[0]

  router.push(`/day/${formatted}`)
}

</script>

<template>

<CalendarViewSwitcher />
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

    <div class="points" v-if="pointsByDay[day.fullDate]">
      ⭐ {{ pointsByDay[day.fullDate] }}
    </div>

  </div>

</div>

<div class="month-points">
  ⭐ Total do mês: {{ totalMonthPoints }}
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