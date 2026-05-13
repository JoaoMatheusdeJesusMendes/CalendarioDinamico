import api from "@/infra/api"

export interface PerformanceSummary {
  totalPoints: number
  completedTasks: number
  activeDays: number
  averagePointsPerDay: number
}

export interface PerformanceResponse {
  summary: PerformanceSummary
  labels: string[]
  data: number[]
}

export async function getPerformance(
  type: "weekly" | "monthly" | "yearly",
  date?: string
): Promise<PerformanceResponse> {
  const response = await api.get("/users/performance", {
    params: {
      type,
      date
    }
  })

  return response.data
}