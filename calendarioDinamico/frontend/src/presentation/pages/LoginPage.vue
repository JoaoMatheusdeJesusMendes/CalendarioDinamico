<script setup lang="ts">

import { ref } from "vue"
import { useRouter } from "vue-router"
import { login } from "@/domain/services/authService"

const router = useRouter()
const email = ref("")
const password = ref("")

async function submit(){

  try{

    const response = await login({
      email: email.value,
      password: password.value
    })

    // 🔥 garante que veio token
    if (!response.token) {
      throw new Error(response.message || "Erro ao fazer login")
    }

    localStorage.setItem("token", response.token)

    const today = new Date()

    router.push(`/month/${today.getFullYear()}/${today.getMonth()+1}`)

  }catch(error:any){

    if (error.message.includes("Verifique seu email")) {
      alert("Você precisa verificar seu email antes de entrar.")
    } else if (error.message.includes("Credenciais")) {
      alert("Email ou senha inválidos")
    } else {
      alert("Erro ao fazer login")
    }

  }

}
</script>

<template>

<div class="login">

<h2>Entrar</h2>

<input v-model="email" placeholder="Email"/>
<input v-model="password" type="password" placeholder="Senha"/>

<button @click="submit">
Entrar
</button>

<button>
Entrar com Google
</button>

</div>

</template>
