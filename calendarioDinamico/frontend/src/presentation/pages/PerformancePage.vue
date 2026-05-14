<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { getPerformance, type PerformanceResponse } from "@/domain/services/performanceService"
import PerformanceChart from "@/presentation/components/PerformanceChart.vue"

type PeriodType =
  | "weekly"
  | "monthly"
  | "yearly"

const period = ref<PeriodType>("weekly")

const selectedYear = ref(new Date().getFullYear())
const selectedMonth = ref(new Date().getMonth() + 1)
const selectedWeek = ref(1)

const performance =
  ref<PerformanceResponse | null>(null)

const loading = ref(false)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "top",
      align: "end"
    }
  }
}

const years = computed(() => {
  const currentYear = new Date().getFullYear()
  const result = []

  for (let year = currentYear - 5; year <= currentYear + 5; year++) {
    result.push(year)
  }

  return result
})

const months = [
  { value: 1, label: "Janeiro" },
  { value: 2, label: "Fevereiro" },
  { value: 3, label: "Março" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Maio" },
  { value: 6, label: "Junho" },
  { value: 7, label: "Julho" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Setembro" },
  { value: 10, label: "Outubro" },
  { value: 11, label: "Novembro" },
  { value: 12, label: "Dezembro" }
]

function buildDate(): string {
  if (period.value === "weekly") {
    const firstDay = new Date(
      selectedYear.value,
      selectedMonth.value - 1,
      1
    )

    const dayOfMonth = 1 + (selectedWeek.value - 1) * 7

    const targetDate = new Date(
      selectedYear.value,
      selectedMonth.value - 1,
      dayOfMonth
    )

    return targetDate.toISOString().slice(0, 10)
  }

  if (period.value === "monthly") {
    return `${selectedYear.value}-${String(
      selectedMonth.value
    ).padStart(2, "0")}-01`
  }

  return `${selectedYear.value}-01-01`
}

async function loadPerformance() {
  loading.value = true

  try {
    const date = buildDate()

    performance.value = await getPerformance(
      period.value,
      date
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

onMounted(loadPerformance)
</script>

<template>
  <div class="performance-page">
    <h1>Desempenho</h1>

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

    <div class="filters">

      <select v-model="period">
        <option value="weekly">Semanal</option>
        <option value="monthly">Mensal</option>
        <option value="yearly">Anual</option>
      </select>

      <select
        v-if="period === 'weekly'"
        v-model="selectedWeek"
      >
        <option :value="1">Semana 1</option>
        <option :value="2">Semana 2</option>
        <option :value="3">Semana 3</option>
        <option :value="4">Semana 4</option>
        <option :value="5">Semana 5</option>
      </select>

      <select
        v-if="period !== 'yearly'"
        v-model="selectedMonth"
      >
        <option
          v-for="month in months"
          :key="month.value"
          :value="month.value"
        >
          {{ month.label }}
        </option>
      </select>

      <select v-model="selectedYear">
        <option
          v-for="year in years"
          :key="year"
          :value="year"
        >
          {{ year }}
        </option>
      </select>

      <button @click="loadPerformance">
        Atualizar
      </button>
    </div>

    <p v-if="loading">
      Carregando...
    </p>

    <PerformanceChart
    v-else-if="performance"
    :labels="performance.labels"
    :values="performance.data"
    :options="chartOptions"
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