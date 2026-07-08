<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()

const token = route.query.token as string

if (token) {

  localStorage.setItem("token", token)

  const today = new Date()

  router.replace(
    `/month/${today.getFullYear()}/${today.getMonth() + 1}`
  )

}
</script>

<template>
  <p>Entrando...</p>
</template>