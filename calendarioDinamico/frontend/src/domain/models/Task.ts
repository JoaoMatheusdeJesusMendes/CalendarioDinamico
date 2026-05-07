export interface Task {

  _id: string
  date: Date
  startTime: string
  endTime: string
  location?: string
  description?: string
  points: number
  status: "todo" | "doing" | "done"

}