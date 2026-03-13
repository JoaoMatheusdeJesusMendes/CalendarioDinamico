export interface Task {

  _id: string
  date: string
  startTime: string
  endTime: string
  location?: string
  description?: string
  points: number
  status: "todo" | "doing" | "done"

}