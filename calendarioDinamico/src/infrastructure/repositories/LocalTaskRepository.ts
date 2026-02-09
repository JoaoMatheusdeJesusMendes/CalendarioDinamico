import { TaskRepository } from '../../domain/repositories/TaskRepository'
import { Task } from '../../domain/entities/Task'
import { LocalStorageClient } from '../persistence/localStorageClient'

export class LocalTaskRepository implements TaskRepository {
  private readonly key = 'tasks'

  constructor(private storage: LocalStorageClient) {}

  async getAll(): Promise<Task[]> {
    return this.storage.load<Task[]>(this.key) ?? []
  }

  async save(task: Task): Promise<void> {
    const tasks = await this.getAll()
    tasks.push(task)
    this.storage.save(this.key, tasks)
  }

  async update(task: Task): Promise<void> {
    const tasks = await this.getAll()
    const idx = tasks.findIndex(t => t.id === task.id)
    if (idx !== -1) {
      tasks[idx] = task
      this.storage.save(this.key, tasks)
    }
  }
}
