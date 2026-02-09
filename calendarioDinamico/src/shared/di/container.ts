import { LocalTaskRepository } from '@/infrastructure/repositories/LocalTaskRepository'
import { LocalStorageClient } from '@/infrastructure/persistence/localStorageClient'
import { DefaultPointsCalculator } from '@/domain/services/PointsCalculator'
import { AddTaskUseCase } from '@/application/usecases/AddTaskUseCase'
import { CompleteTaskUseCase } from '@/application/usecases/CompleteTaskUseCase'
import { GetTasksByRangeUseCase } from '@/application/usecases/GetTasksByRangeUseCase'
import { GetPointsByRangeUseCase } from '@/application/usecases/GetPointsByRangeUseCase'

const storage = new LocalStorageClient()
const taskRepo = new LocalTaskRepository(storage)
const pointsCalculator = new DefaultPointsCalculator()

export const container = {
  addTask: new AddTaskUseCase(taskRepo),
  completeTask: new CompleteTaskUseCase(taskRepo),
  getTasksByRange: new GetTasksByRangeUseCase(taskRepo),
  getPointsByRange: new GetPointsByRangeUseCase(taskRepo, pointsCalculator),
}
