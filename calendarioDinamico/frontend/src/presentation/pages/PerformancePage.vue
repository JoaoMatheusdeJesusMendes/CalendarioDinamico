<script setup lang="ts">
import { ref, onMounted } from "vue"
import {
  getPerformance,
  type PerformanceResponse
} from "@/domain/services/performanceService"
import PerformanceChart from
  "@/presentation/components/PerformanceChart.vue"

type PeriodType =
  | "weekly"
  | "monthly"
  | "yearly"

const period = ref<PeriodType>("weekly")
const selectedDate = ref(
  new Date().toISOString().slice(0, 10)
)

const performance =
  ref<PerformanceResponse | null>(null)

const loading = ref(false)

async function loadPerformance() {
  loading.value = true

  try {
    performance.value = await getPerformance(
      period.value,
      selectedDate.value
    )
  } catch (error) {
    console.error(
      "Erro ao carregar desempenho:",
      error
    )
  } finally {
    loading.value = false
  }
}

function generate() {
  loadPerformance()
}

onMounted(loadPerformance)
</script>

<template>
  <div class="performance-page">
    <h1>Desempenho</h1>

    <!-- Métricas -->
    <div
      v-if="performance"
      class="summary-grid"
    >
      <div class="card">
        <h3>Pontos Totais</h3>
        <p>{{ performance.summary.totalPoints }}</p>
      </div>

      <div class="card">
        <h3>Tarefas Concluídas</h3>
        <p>{{ performance.summary.completedTasks }}</p>
      </div>

      <div class="card">
        <h3>Dias Ativos</h3>
        <p>{{ performance.summary.activeDays }}</p>
      </div>

      <div class="card">
        <h3>Média por Dia</h3>
        <p>
          {{
            performance.summary.averagePointsPerDay
          }}
        </p>
      </div>
    </div>

    <!-- Filtros -->
    <div class="filters">
      <select v-model="period">
        <option value="weekly">
          Semanal
        </option>
        <option value="monthly">
          Mensal
        </option>
        <option value="yearly">
          Anual
        </option>
      </select>

      <input
        v-model="selectedDate"
        type="date"
      />

      <button @click="generate">
        Atualizar
      </button>
    </div>

    <!-- Loading -->
    <p v-if="loading">
      Carregando...
    </p>

    <!-- Gráfico -->
    <PerformanceChart
      v-else-if="performance"
      :labels="performance.labels"
      :values="performance.data"
    />
  </div>
</template>

<style scoped>
.performance-page {
  padding: 24px;
}

.summary-grid {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.05);
}

.card h3 {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #6b7280;
}

.card p {
  margin: 0;
  font-size: 28px;
  font-weight: bold;
}

.filters {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  align-items: center;
}

select,
input,
button {
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
}

button {
  background: #2563eb;
  color: white;
  border: none;
  cursor: pointer;
}
</style>