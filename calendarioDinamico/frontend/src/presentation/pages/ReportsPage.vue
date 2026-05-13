<script setup lang="ts">
import { ref } from "vue"
import { generateReport } from "@/domain/services/userService"

const reportType = ref("weekly")
const selectedDate = ref("")
const loading = ref(false)

async function handleGenerateReport() {
  try {
    loading.value = true

    await generateReport({
      type: reportType.value,
      date: selectedDate.value
    })

    alert("Relatório enviado para seu e-mail com sucesso!")
  } catch (error) {
    console.error("Erro ao gerar relatório:", error)
    alert("Erro ao gerar relatório.")
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="reports-page">
    <h1>Relatórios</h1>

    <label>Tipo de Relatório</label>
    <select v-model="reportType">
      <option value="weekly">Semanal</option>
      <option value="monthly">Mensal</option>
      <option value="yearly">Anual</option>
    </select>

    <template v-if="reportType === 'weekly'">
      <label>Escolha uma data da semana</label>
      <input
        type="date"
        v-model="selectedDate"
      />
    </template>

    <template v-else-if="reportType === 'monthly'">
      <label>Escolha o mês</label>
      <input
        type="month"
        v-model="selectedDate"
      />
    </template>

    <template v-else>
      <label>Escolha o ano</label>
      <input
        type="number"
        v-model="selectedDate"
        min="2000"
        max="2100"
      />
    </template>

    <button
      @click="handleGenerateReport"
      :disabled="loading || !selectedDate"
    >
      {{ loading ? "Gerando..." : "Gerar Relatório" }}
    </button>
  </div>
</template>

<style scoped>
.reports-page {
  max-width: 500px;
  margin: 40px auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

label {
  font-weight: 600;
}

select,
input {
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
}

button {
  margin-top: 16px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>