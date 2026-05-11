<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import {
  getProfile,
  updateProfile
} from "@/domain/services/userService"

const router = useRouter()

const form = ref({
  name: "",
  email: "",
  age: null as number | null,
  profileImage: "",
  password: ""
})

const loading = ref(false)

async function loadProfile() {
  try {
    const data = await getProfile()

    form.value = {
      name: data.name || "",
      email: data.email || "",
      age: data.age ?? null,
      profileImage: data.profileImage || "",
      password: ""
    }
  } catch (error) {
    console.error("Erro ao carregar perfil:", error)
    alert("Não foi possível carregar o perfil.")
  }
}

async function handleImageUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  const reader = new FileReader()

  reader.onload = () => {
    form.value.profileImage = reader.result as string
  }

  reader.readAsDataURL(file)
}

async function saveProfile() {
  try {
    loading.value = true

    const payload: any = {}

    if (form.value.name.trim() !== "") {
      payload.name = form.value.name
    }

    if (form.value.email.trim() !== "") {
      payload.email = form.value.email
    }

    if (form.value.age !== null) {
      payload.age = form.value.age
    }

    payload.profileImage = form.value.profileImage

    if (form.value.password.trim() !== "") {
      payload.password = form.value.password
    }

    await updateProfile(payload)

    alert("Perfil atualizado com sucesso!")

    router.push("/profile")
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error)
    alert("Erro ao atualizar perfil.")
  } finally {
    loading.value = false
  }
}

function cancel() {
  router.push("/profile")
}

onMounted(loadProfile)
</script>

<template>
  <div class="edit-profile-page">
    <h1>Editar Perfil</h1>

    <img
    v-if="form.profileImage"
    :src="form.profileImage"
    class="avatar"
    />

    <input
    type="file"
    accept="image/*"
    @change="handleImageUpload"
    />

    <input
      v-model="form.name"
      placeholder="Nome"
    />

    <input
      v-model="form.email"
      type="email"
      placeholder="Email"
    />

    <input
      v-model="form.age"
      type="number"
      placeholder="Idade"
    />

    <input
      v-model="form.password"
      type="password"
      placeholder="Nova senha (opcional)"
    />

    <div class="actions">
      <button
        @click="saveProfile"
        :disabled="loading"
      >
        {{ loading ? "Salvando..." : "Salvar Alterações" }}
      </button>

      <button
        class="cancel"
        @click="cancel"
        :disabled="loading"
      >
        Cancelar
      </button>
    </div>
  </div>
</template>

<style scoped>
.edit-profile-page {
  max-width: 500px;
  margin: 40px auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  align-self: center;
  margin-bottom: 16px;
}

input {
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
}

.actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

button {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

button:first-child {
  background: #2563eb;
  color: white;
}

button.cancel {
  background: #e5e7eb;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>