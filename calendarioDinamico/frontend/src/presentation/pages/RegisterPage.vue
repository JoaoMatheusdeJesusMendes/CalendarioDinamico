```vue
<script setup lang="ts">

import { ref } from "vue"
import { useRouter } from "vue-router"
import { register } from "@/domain/services/authService"

const router = useRouter()

const name = ref("")
const email = ref("")
const password = ref("")
const age = ref()

async function submit(){

  const response = await register({
    name: name.value,
    email: email.value,
    password: password.value,
    age: age.value
  })

  localStorage.setItem("token", response.token)

  router.push("/calendar")

}

</script>

<template>

<div class="register">

<h2>Criar Conta</h2>

<input v-model="name" placeholder="Nome"/>
<input v-model="email" placeholder="Email"/>
<input v-model="password" type="password" placeholder="Senha"/>
<input v-model="age" type="number" placeholder="Idade"/>

<button @click="submit">
Cadastrar
</button>

<button>
Cadastrar com Google
</button>

</div>

</template>
```
