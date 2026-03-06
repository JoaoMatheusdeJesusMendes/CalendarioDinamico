import type { Task } from "./Task"

export interface CalendarDay {
  date: Date
  tasks: Task[]
  totalPoints: number
}