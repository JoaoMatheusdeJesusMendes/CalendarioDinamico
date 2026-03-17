const API = "http://localhost:3000"

export async function getTasks(){

  const token = localStorage.getItem("token")

  const res = await fetch(`${API}/tasks`,{
    headers:{
      "Authorization": `Bearer ${token}`
    }
  })

  return await res.json()
}

export async function createTask(task:any){

  const token = localStorage.getItem("token")

  const res = await fetch(`${API}/tasks`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization": `Bearer ${token}`
    },
    body:JSON.stringify(task)
  })

  return await res.json()
}

export async function updateTask(id: string, data: any) {

  const token = localStorage.getItem("token")

  const res = await fetch(`http://localhost:3000/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })

  return res.json()
}