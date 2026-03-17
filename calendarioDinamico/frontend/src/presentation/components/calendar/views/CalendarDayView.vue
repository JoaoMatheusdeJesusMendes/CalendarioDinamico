<script setup lang="ts">

import { computed, ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { getTasks } from "@/domain/services/taskService"
import type { Task } from "@/domain/models/Task"

const route = useRoute()
const router = useRouter()

const tasks = ref<Task[]>([])

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

const dateString = computed(() => {
  return route.params.date as string
})

onMounted(async () => {

  const data = await getTasks()

  console.log("Tasks recebidas:", data)
  console.log("Data da rota:", dateString.value)

  if (Array.isArray(data)) {

    tasks.value = data.filter(
      (task:any) => task.date === dateString.value
    )

  } else {

    console.error("Erro ao carregar tarefas:", data)
    tasks.value = []

  }

})

const completedTasks = computed(() => {
  return tasks.value.filter((task:any)=>task.status === "done")
})

const totalPoints = computed(() => {
  return completedTasks.value.reduce(
    (sum:number, task:any)=> sum + task.points,
    0
  )
})

function createTask(){

  router.push({
    name:"createTask",
    query:{
      date:dateString.value
    }
  })

}

</script>

<template>

<div class="day-view">

  <h2 class="date">
    {{ formattedDate }}
  </h2>

  <div class="points">
    ⭐ Pontos do dia: {{ totalPoints }}
  </div>

  <button class="create" @click="createTask">
    + Criar tarefa
  </button>

  <div class="tasks">

    <div
      v-for="task in tasks"
      :key="task._id"
      class="task"
    >

      <span class="task-title">
        {{ task.description }}
      </span>

      <span class="task-points">
        +{{ task.points }} XP
      </span>

    </div>

  </div>

</div>

</template>