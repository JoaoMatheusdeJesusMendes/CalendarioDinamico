<template>
  <div class="space-y-4">
    <ViewSelector v-model="mode" />

    <CalendarGrid
      :mode="mode"
      :base-date="currentDate"
    />

    <PointsSummary :points="points" />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { container } from '../../../shared/di/container'
import ViewSelector from './ViewSelector.vue'
import CalendarGrid from './CalendarGrid.vue'
import PointsSummary from '../gamification/PointsSummary.vue'
import { formatISO } from 'date-fns'
import { getRange } from '../../../shared/dates/DateRangeService'

const mode = ref<'day' | 'week' | 'month' | 'year'>('month')
const currentDate = ref(new Date())
const points = ref(0)

watchEffect(async () => {
  const { start, end } = getRange(mode.value, currentDate.value)
  points.value = await container.getPointsByRange.execute(
    formatISO(start, { representation: 'date' }),
    formatISO(end, { representation: 'date' })
  )
})
</script>
