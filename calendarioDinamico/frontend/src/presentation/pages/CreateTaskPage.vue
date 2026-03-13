<script setup lang="ts">

import { ref } from "vue"
import { useRouter } from "vue-router"
import { createTask } from "@/domain/services/taskService"

const router = useRouter()

const date = ref(new Date().toISOString().slice(0,10))
const startTime = ref("")
const endTime = ref("")
const location = ref("")
const description = ref("")
const points = ref(0)
const status = ref("todo")

async function submit(){

  await createTask({
    date: date.value,
    startTime: startTime.value,
    endTime: endTime.value,
    location: location.value,
    description: description.value,
    points: points.value,
    status: status.value
  })

  router.back()

}

</script>

<template>

<div class="create-task">

<h2>Criar Tarefa</h2>

<input type="date" v-model="date"/>

<input type="time" v-model="startTime"/>
<input type="time" v-model="endTime"/>

<input placeholder="Local" v-model="location"/>

<textarea placeholder="Descrição" v-model="description"/>

<input type="number" v-model="points"/>

<select v-model="status">

<option value="todo">A fazer</option>
<option value="doing">Em andamento</option>
<option value="done">Concluído</option>

</select>

<button @click="submit">
Criar tarefa
</button>

</div>

</template>