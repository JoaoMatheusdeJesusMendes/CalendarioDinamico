import api from "@/infra/api"
import type { User } from "@/domain/models/User"

export async function getProfile(): Promise<User> {
  const response = await api.get("/users/profile")
  return response.data
}

export async function updateProfile(
  data: Partial<User> & { password?: string }
): Promise<User> {
  const response = await api.put("/users/profile", data)
  return response.data
}