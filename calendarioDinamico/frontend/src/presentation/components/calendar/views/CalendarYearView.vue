<script setup lang="ts">

import { computed, ref, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"
import { getTasks } from "@/domain/services/taskService"

const router = useRouter()
const route = useRoute()
const year = computed(() => Number(route.params.year))
const tasks = ref<any[]>([])

const pointsByMonth = computed(() => {
  const map: Record<number, number> = {}

  tasks.value.forEach(task => {
    if (task.status !== "done") return

    const taskDate = new Date(task.date)
    if (Number.isNaN(taskDate.getTime())) return

    const taskYear = taskDate.getFullYear()
    if (taskYear !== year.value) return

    const monthIndex = taskDate.getMonth()
    map[monthIndex] = (map[monthIndex] || 0) + task.points
  })

  return map
})

const months = computed(() => {
  const monthNames = [
    "Jan","Fev","Mar","Abr","Mai","Jun",
    "Jul","Ago","Set","Out","Nov","Dez"
  ]

  return monthNames.map((name, index) => ({
    name,
    date: new Date(year.value, index, 1),
    points: pointsByMonth.value[index] || 0
  }))
})

const totalYearPoints = computed(() => {
  return months.value.reduce((sum, month) => sum + month.points, 0)
})

onMounted(async () => {
  const data = await getTasks()

  if (Array.isArray(data)) {
    tasks.value = data
  } else {
    console.error("Erro ao carregar tasks:", data)
    tasks.value = []
  }
})

function openMonth(monthIndex: number) {
  router.push({
    name: "month",
    params: {
      year: year.value,
      month: monthIndex + 1
    }
  })
}

</script>

<template>

<div class="year-view">

  <div
    v-for="(month, index) in months"
    :key="month.date.toISOString()"
    class="month-card"
    @click="openMonth(index)"
  >

    <div class="month-name">
      {{ month.name }}
    </div>

    <div class="points">
      ⭐ {{ month.points }}
    </div>

  </div>

</div>

<div class="year-total">
  ⭐ Total do ano: {{ totalYearPoints }}
</div>

</template>

<style scoped>

.year-view{
display:grid;
grid-template-columns: repeat(4,1fr);
gap:20px;
padding:20px;
}

.month-card{
border:1px solid #ccc;
border-radius:8px;
padding:20px;
text-align:center;
}

.month-name{
font-size:18px;
font-weight:bold;
}

.points{
margin-top:10px;
color:goldenrod;
}

.month{
border:1px solid #ccc;
padding:20px;
cursor:pointer;
border-radius:6px;
}

.month:hover{
background:#f5f5f5;
}

.year-total{
  margin: 20px;
  font-size: 18px;
  font-weight: bold;
  color: goldenrod;
}

</style>