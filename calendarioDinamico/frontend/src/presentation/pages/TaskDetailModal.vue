<script setup lang="ts">
const props = defineProps<{ task: any }>()
const emit = defineEmits(["close", "edit"])
</script>

<template>
  <div class="modal">

    <h2>{{ task.description }}</h2>

    <p><b>Data:</b> {{ task.date }}</p>
    <p><b>Hora:</b> {{ task.startTime }} - {{ task.endTime }}</p>
    <p><b>Status:</b> {{ task.status }}</p>

    <button @click="emit('edit', task)">Editar</button>
    <button @click="emit('close')">Fechar</button>

  </div>
</template>