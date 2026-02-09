import { TaskRepository } from '../../domain/repositories/TaskRepository'
import { Task } from '../../domain/entities/Task'

export class GetTasksByRangeUseCase {
  constructor(private repo: TaskRepository) {}

  async execute(start: string, end: string): Promise<Task[]> {
    const tasks = await this.repo.getAll()
    return tasks.filter(t => t.date >= start && t.date <= end)
  }
}
