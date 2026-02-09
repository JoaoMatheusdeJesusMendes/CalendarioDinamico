import { TaskRepository } from '../../domain/repositories/TaskRepository'
import { Task } from '../../domain/entities/Task'

export class AddTaskUseCase {
  constructor(private repo: TaskRepository) {}

  async execute(task: Task) {
    await this.repo.save(task)
  }
}
