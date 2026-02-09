import { TaskRepository } from '../../domain/repositories/TaskRepository'

export class CompleteTaskUseCase {
  constructor(private repo: TaskRepository) {}

  async execute(taskId: string) {
    const tasks = await this.repo.getAll()
    const task = tasks.find(t => t.id === taskId)
    if (!task) return

    task.complete()
    await this.repo.update(task)
  }
}
