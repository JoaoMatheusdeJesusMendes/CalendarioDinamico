import api from "@/infra/api"

export async function getRanking() {
  const response = await api.get("/ranking")
  return response.data
}