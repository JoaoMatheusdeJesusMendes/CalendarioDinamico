<script setup lang="ts">

import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { getTaskById, updateTask } from "@/domain/services/taskService"

const route = useRoute()
const router = useRouter()

const task = ref<any>(null)

const description = ref("")
const date = ref("")
const startTime = ref("")
const endTime = ref("")
const points = ref(0)
const status = ref("todo")

onMounted(async () => {

  const data = await getTaskById(route.params.id as string)

  task.value = data

  description.value = data.description
  date.value = data.date
  startTime.value = data.startTime
  endTime.value = data.endTime
  points.value = data.points
  status.value = data.status

})

async function submit(){

  await updateTask(task.value._id, {
    description: description.value,
    date: date.value,
    startTime: startTime.value,
    endTime: endTime.value,
    points: points.value,
    status: status.value
  })

  router.push(`/day/${date.value}`)

}


function cancel(){
  router.back()
}

</script>

<template>

<div class="edit-task">

  <h2>Editar Tarefa</h2>

  <input v-model="description" placeholder="Descrição"/>

  <input v-model="date" type="date"/>

  <input v-model="startTime" type="time"/>
  <input v-model="endTime" type="time"/>

  <input v-model="points" type="number" placeholder="Pontos"/>

  <select v-model="status">
    <option value="todo">A Fazer</option>
    <option value="doing">Fazendo</option>
    <option value="done">Concluído</option>
  </select>

  <button @click="submit">
    Atualizar
  </button>

  <button @click="cancel">
    Cancelar
  </button>

</div>

</template>