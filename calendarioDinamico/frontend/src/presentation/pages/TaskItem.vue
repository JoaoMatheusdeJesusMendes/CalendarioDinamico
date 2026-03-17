<script setup lang="ts">
import { ref } from "vue"
import { updateTask } from "@/domain/services/taskService"

const props = defineProps<{
  task: any
}>()

const checked = ref(props.task.status === "done")

async function toggleStatus() {
  checked.value = !checked.value

  await updateTask(props.task._id, {
    status: checked.value ? "done" : "todo"
  })
}
</script>

<template>
  <div class="task-bubble" @click="$emit('open', task)">
    
    <input 
      type="checkbox" 
      :checked="checked"
      @click.stop="toggleStatus"
    />

    <span>{{ task.description }}</span>

  </div>
</template>