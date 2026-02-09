import { PointsCalculator } from '../../domain/services/PointsCalculator'
import { TaskRepository } from '../../domain/repositories/TaskRepository'

export class GetPointsByRangeUseCase {
  constructor(
    private repo: TaskRepository,
    private calculator: PointsCalculator
  ) {}

  async execute(start: string, end: string): Promise<number> {
    const tasks = await this.repo.getAll()
    const filtered = tasks.filter(t => t.date >= start && t.date <= end)
    return this.calculator.calculate(filtered)
  }
}
