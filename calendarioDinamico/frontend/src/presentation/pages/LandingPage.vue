```vue
<script setup lang="ts">
import { useRouter } from "vue-router"

const router = useRouter()

function goLogin(){
  router.push("/login")
}

function goRegister(){
  router.push("/register")
}
</script>

<template>

<div class="landing">

  <h1>Calendário Gamificado</h1>
  <p>Organize tarefas e ganhe pontos completando objetivos.</p>

  <div class="buttons">
    <button @click="goLogin">Entrar</button>
    <button @click="goRegister">Criar Conta</button>
  </div>

</div>

</template>

<style scoped>

.landing{
height:100vh;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
gap:20px;
}

.buttons{
display:flex;
gap:10px;
}

button{
padding:10px 20px;
cursor:pointer;
}

</style>
```
