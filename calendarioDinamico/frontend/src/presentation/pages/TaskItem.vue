<script setup lang="ts">
import { updateTask } from "@/domain/services/taskService"

const props = defineProps<{
  task: any
}>()

const emit = defineEmits(["update", "open"])

function nextStatus(current: string) {
  if (current === "todo") return "doing"
  if (current === "doing") return "done"
  return "todo"
}

async function changeStatus() {
  const newStatus = nextStatus(props.task.status)

  await updateTask(props.task._id, {
    status: newStatus
  })

  // 🔥 Atualiza local (UX rápida)
  props.task.status = newStatus
}

function openTask() {
  emit("open", props.task)
}
</script>

<template>
  <div class="task-bubble">

    <div class="task">

      <span class="task-title" @click="openTask">
        {{ task.description }}
      </span>

      <span
        class="task-status"
        :class="task.status"
        @click.stop="changeStatus"
      >
        {{ task.status }}
      </span>

    </div>

  </div>
</template>

<style scoped>
.task {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.task-status {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
}

.task-status.todo {
  background: #eee;
}

.task-status.doing {
  background: #87cefa;
}

.task-status.done {
  background: #90ee90;
}

.task-status:hover {
  transform: scale(1.05);
}
</style>