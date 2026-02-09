import { defineStore } from 'pinia'
import { ref } from 'vue'
import { container } from '../../shared/di/container'
import { Task } from '../../domain/entities/Task'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])

  async function load() {
    tasks.value = await container.getTasksByRange.execute('0000-00-00', '9999-12-31')
  }

  async function add(task: Task) {
    await container.addTask.execute(task)
    await load()
  }

  async function complete(taskId: string) {
    await container.completeTask.execute(taskId)
    await load()
  }

  return {
    tasks,
    load,
    add,
    complete,
  }
})
