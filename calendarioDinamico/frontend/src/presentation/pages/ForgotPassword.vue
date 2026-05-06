<script setup lang="ts">
import { ref } from "vue"
import { forgotPassword } from "@/domain/services/authService"

const email = ref("")

async function submit(){
  try{
    await forgotPassword(email.value)
    alert("Se o email existir, um link foi enviado.")
  }catch{
    alert("Erro ao solicitar recuperação")
  }
}
</script>

<template>
  <div>
    <h2>Recuperar senha</h2>
    <input v-model="email" placeholder="Digite seu email"/>
    <button @click="submit">Enviar</button>
  </div>
</template>