const API = "http://localhost:3000"

async function handleResponse(res: Response) {
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || "Erro na requisição")
  }
  return res.json()
}

export async function getTasks() {

  const token = localStorage.getItem("token")

  const res = await fetch(`${API}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return handleResponse(res)
}

export async function createTask(task: any) {

  const token = localStorage.getItem("token")

  const res = await fetch(`${API}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(task)
  })

  return handleResponse(res)
}

export async function updateTask(id: string, data: any) {

  const token = localStorage.getItem("token")

  const res = await fetch(`${API}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })

  return handleResponse(res)
}

export async function getTaskById(id: string) {

  const token = localStorage.getItem("token")

  const res = await fetch(`${API}/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return handleResponse(res)
}