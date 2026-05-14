<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"

import { Line } from "vue-chartjs"
import { computed } from "vue"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const props = defineProps<{
  labels: string[]
  values: number[]
  options?: any
}>()

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: "Pontos",
      data: props.values,
      tension: 0.3,
      fill: false,
      borderColor: "#2563eb",
      backgroundColor: "#2563eb"
    }
  ]
}))

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false
}

const finalOptions = computed(() => {
  return props.options || defaultOptions
})
</script>

<template>
  <div style="height: 400px;">
    <Line
      :data="chartData"
      :options="finalOptions"
    />
  </div>
</template>