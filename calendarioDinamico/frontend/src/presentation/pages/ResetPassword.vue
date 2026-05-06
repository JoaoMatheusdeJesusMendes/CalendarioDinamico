<script setup lang="ts">
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { resetPassword } from "@/domain/services/authService"

const route = useRoute()
const router = useRouter()
const token = route.query.token as string

const password = ref("")

async function submit(){
  try{
    await resetPassword(token, password.value)
    alert("Senha alterada com sucesso!")
    router.push("/login")
  }catch{
    alert("Token inválido ou expirado")
  }
}
</script>

<template>
  <div>
    <h2>Nova senha</h2>
    <input v-model="password" type="password" placeholder="Nova senha"/>
    <button @click="submit">Salvar</button>
  </div>
</template>