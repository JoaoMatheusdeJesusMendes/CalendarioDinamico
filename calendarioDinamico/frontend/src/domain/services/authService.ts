const API = "http://localhost:3000"

export async function register(data:any){

  const res = await fetch("http://localhost:3000/auth/register",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })

  const text = await res.text()

  console.log("Resposta backend:", text)

  return JSON.parse(text)

}

export async function login(credentials:any){

  const res = await fetch("http://localhost:3000/auth/login",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(credentials)
  })

  const data = await res.json()

  console.log("LOGIN RESPONSE:", data)

  localStorage.setItem("token", data.token)

  return data
}