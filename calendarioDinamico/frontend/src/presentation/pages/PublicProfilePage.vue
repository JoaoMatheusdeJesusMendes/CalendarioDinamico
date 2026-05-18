<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { getUserById } from "@/domain/services/userService"

const route = useRoute()
const profile = ref<any>(null)

onMounted(async () => {
  profile.value = await getUserById(
    route.params.id as string
  )
})
</script>

<template>
  <div
    v-if="profile"
    class="public-profile"
  >
    <img
      :src="
        profile.profileImage ||
        '/default-avatar.png'
      "
      alt="Foto do usuário"
      class="profile-avatar"
    />

    <h1 class="profile-name">
      {{ profile.name }}
    </h1>

    <div class="profile-ranks">
      <p class="rank-item">
        <strong>Ranking Atual:</strong>
        {{ profile.currentRank || "Aprendiz" }}
      </p>

      <p class="rank-item">
        <strong>Maior Ranking:</strong>
        {{ profile.highestRank || "Aprendiz" }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.public-profile {
  max-width: 600px;
  margin: 40px auto;
  padding: 32px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.profile-avatar {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #4f46e5;
  margin-bottom: 20px;
}

.profile-name {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 24px;
  color: #1f2937;
}

.profile-ranks {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.rank-item {
  font-size: 1.1rem;
  padding: 12px 16px;
  background: #f8fafc;
  border-radius: 10px;
  color: #374151;
}
</style>