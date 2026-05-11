<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { getProfile } from "@/domain/services/userService"
import type { User } from "@/domain/models/User"

const router = useRouter()

const profile = ref<User>({
  _id: "",
  name: "",
  email: "",
  age: null,
  profileImage: ""
})

async function loadProfile() {
  try {
    const data = await getProfile()

    profile.value = {
    _id: data._id,
    name: data.name,
    email: data.email,
    age: data.age,
    profileImage: data.profileImage || ""
    }
  } catch (error) {
    console.error("Erro ao carregar perfil:", error)
  }
}

function goToEdit() {
  router.push("/profile/edit")
}

onMounted(loadProfile)
</script>

<template>
  <div class="profile-page">
    <h1>Meu Perfil</h1>

    <img
      v-if="profile.profileImage"
      :src="profile.profileImage"
      class="avatar"
    />

    <p><strong>Nome:</strong> {{ profile.name }}</p>
    <p><strong>Email:</strong> {{ profile.email }}</p>
    <p><strong>Idade:</strong> {{ profile.age || "Não informada" }}</p>

    <button @click="goToEdit">
      Editar Perfil
    </button>
  </div>
</template>