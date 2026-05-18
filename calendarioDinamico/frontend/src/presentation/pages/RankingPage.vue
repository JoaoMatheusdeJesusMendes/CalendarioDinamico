<script setup lang="ts">
import { onMounted, ref } from "vue"
import { getRanking } from "@/domain/services/rankingService"
import { useRouter } from "vue-router"

const router = useRouter()
const ranking = ref<any>(null)
const loading = ref(true)

function goToProfile(userId: string) {
  router.push(`/profile/${userId}`)
}

onMounted(async () => {
  ranking.value = await getRanking()
  loading.value = false
})
</script>

<template>
  <div class="ranking-page">
    <h1>🏆 Ranking Mensal</h1>

    <div v-if="loading">
      Carregando...
    </div>

    <div v-else-if="ranking">
      <p><strong>Rank Atual:</strong> {{ ranking.currentRank }}</p>
      <p><strong>Maior Rank:</strong> {{ ranking.highestRank }}</p>
      <p><strong>Pontos da Season:</strong> {{ ranking.seasonPoints }}</p>
      <p><strong>Próximo Rank:</strong> {{ ranking.nextRank }}</p>
      <p><strong>Pontos para subir:</strong> {{ ranking.pointsToNextRank }}</p>

      <h2>Top 10 - {{ ranking.currentRank }}</h2>

    <div class="top10-list">
    <div
        v-for="player in ranking.top10"
        :key="player.userId"
        class="player-card"
        @click="goToProfile(player.userId)"
    >
        <img
        :src="player.profileImage || '/default-avatar.png'"
        alt="Avatar"
        class="player-avatar"
        />

        <div class="player-info">
        <span class="player-name">
            {{ player.name }}
        </span>

        <span class="player-points">
            ⭐ {{ player.points }} pts
        </span>
        </div>
    </div>
    </div>
    </div>
  </div>
</template>

<style scoped>
.ranking-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}
.top10-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 1rem;
}

.player-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  background: #f5f5f5;
  cursor: pointer;
  transition: all 0.2s ease;
}

.player-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.player-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ddd;
}

.player-info {
  display: flex;
  flex-direction: column;
}

.player-name {
  font-weight: 600;
  font-size: 16px;
}

.player-points {
  font-size: 14px;
  color: #666;
}
</style>