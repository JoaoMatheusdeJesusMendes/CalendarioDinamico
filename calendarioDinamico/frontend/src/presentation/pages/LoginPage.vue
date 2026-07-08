<script setup lang="ts">

import { ref, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"
import { login } from "@/domain/services/authService"

const router = useRouter()
const route = useRoute()
const email = ref("")
const password = ref("")
const oauthError = ref("")

onMounted(() => {
    if (route.query.error) {
        oauthError.value = route.query.error as string
    }
})

function goToForgotPassword() {
  router.push("/forgot-password")
}

function loginGoogle(){

    window.location.href =
    "http://localhost:3000/auth/google"

}

async function submit(){

  try{

    const response = await login({
      email: email.value,
      password: password.value
    })

    if (!response.token) {
      throw new Error(response.message || "Erro ao fazer login")
    }

    localStorage.setItem("token", response.token)

    const today = new Date()

    router.push(`/month/${today.getFullYear()}/${today.getMonth()+1}`)

  }catch (error: any) {

  alert(error.message)

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

<button @click="loginGoogle">
Entrar com Google
</button>

<button @click="goToForgotPassword">
Esqueci minha senha
</button>

<p v-if="oauthError" class="error">
  {{ oauthError }}
</p>

</div>

</template>

<style scoped>
.error{
  color:red;
  margin-bottom:15px;
  font-weight:bold;
}
</style>
