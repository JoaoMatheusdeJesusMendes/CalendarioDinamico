<script setup lang="ts">

import { useRouter } from "vue-router"

const router = useRouter()

function changeView(view: string) {

  if(view === "day"){
    const today = new Date().toISOString().split("T")[0]
    router.push(`/day/${today}`)
    return
  }

  router.push(`/${view}`)

}

</script>

<template>

<div class="view-switcher">

  <button @click="changeView('week')">Semana</button>

  <button @click="changeView('month')">Mês</button>

  <button @click="changeView('year')">Ano</button>

</div>

</template>

<style scoped>

.view-switcher{
display:flex;
gap:10px;
margin-bottom:20px;
}

button{
padding:8px 12px;
border:1px solid #ccc;
border-radius:6px;
cursor:pointer;
}

</style>