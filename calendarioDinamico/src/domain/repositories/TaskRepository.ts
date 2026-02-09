import { Task } from '../entities/Task'

export interface TaskRepository {
  getAll(): Promise<Task[]>
  save(task: Task): Promise<void>
  update(task: Task): Promise<void>
}
