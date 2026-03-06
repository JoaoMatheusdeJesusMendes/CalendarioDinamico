<script setup lang="ts">

import { computed } from "vue"
import { useCalendarStore } from "../../../../stores/calendarStore"
import { useRoute } from "vue-router"

const calendarStore = useCalendarStore()

const route = useRoute()

const selectedDate = computed(() => {

  const dateParam = route.params.date as string
  const [year, month, day] = dateParam.split("-").map(Number)

  return new Date(year, month - 1, day)

})

const formattedDate = computed(() => {
  return selectedDate.value.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  })
})

// futuramente virá de um taskStore
const tasks = [
  { id: 1, title: "Estudar Vue", points: 10 },
  { id: 2, title: "Trabalhar no TCC", points: 20 }
]

const totalPoints = computed(() => {
  return tasks.reduce((sum, task) => sum + task.points, 0)
})

</script>

<template>

<div class="day-view">

  <h2 class="date">
    {{ formattedDate }}
  </h2>

  <div class="points">
    ⭐ Pontos do dia: {{ totalPoints }}
  </div>

  <div class="tasks">

    <div
      v-for="task in tasks"
      :key="task.id"
      class="task"
    >

      <span class="task-title">
        {{ task.title }}
      </span>

      <span class="task-points">
        +{{ task.points }} XP
      </span>

    </div>

  </div>

</div>

</template>

<style scoped>

.day-view{
padding:20px;
display:flex;
flex-direction:column;
gap:20px;
}

.date{
font-size:24px;
font-weight:bold;
}

.points{
font-size:18px;
}

.tasks{
display:flex;
flex-direction:column;
gap:10px;
}

.task{
display:flex;
justify-content:space-between;
border:1px solid #ccc;
padding:10px;
border-radius:6px;
}

.task-title{
font-weight:500;
}

.task-points{
color:goldenrod;
}

</style>