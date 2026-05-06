import api from "@/infra/api"

export async function forgotPassword(email: string){
  const res = await api.post("/auth/forgot-password", { email })
  return res.data
}

export async function resetPassword(token: string, password: string){
  const res = await api.post("/auth/reset-password", {
    token,
    password
  })
  return res.data
}

export async function register(data: any){
  const res = await api.post("/auth/register", data)
  return res.data
}

export async function login(credentials: any){
  try {
    const res = await api.post("/auth/login", credentials)
    return res.data
  } catch (error: any) {
    const message = error.response?.data?.message || "Erro no login"
    throw new Error(message)
  }
}