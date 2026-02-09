import { Task } from '../entities/Task'

export interface PointsCalculator {
  calculate(tasks: Task[]): number
}

export class DefaultPointsCalculator implements PointsCalculator {
  calculate(tasks: Task[]): number {
    return tasks.filter(t => t.completed).reduce((sum, t) => sum + t.points, 0)
  }
}
