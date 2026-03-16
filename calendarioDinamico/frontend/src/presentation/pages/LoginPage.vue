<script setup lang="ts">

import { ref } from "vue"
import { useRouter } from "vue-router"
import { login } from "@/domain/services/authService"

const router = useRouter()
const errorMessage = ref("")
const email = ref("")
const password = ref("")

async function submit(){

  try{

    const response = await login({
      email: email.value,
      password: password.value
    })

    localStorage.setItem("token", response.token)

    const today = new Date()

    router.push(`/month/${today.getFullYear()}/${today.getMonth()+1}`)

  }catch(error){

    alert("Email ou senha inválidos")

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
