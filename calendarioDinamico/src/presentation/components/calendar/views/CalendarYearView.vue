<script setup lang="ts">

import { computed } from "vue"
import { useCalendarStore } from "../../../../stores/calendarStore"

const calendarStore = useCalendarStore()

const months = computed(() => {

  const year = calendarStore.currentDate.getFullYear()

  const monthNames = [
    "Jan","Fev","Mar","Abr","Mai","Jun",
    "Jul","Ago","Set","Out","Nov","Dez"
  ]

  return monthNames.map((name, index) => {

    return {
      name,
      date: new Date(year, index, 1),
      points: 0 // futuramente virá das tarefas
    }

  })

})

</script>

<template>

<div class="year-view">

  <div
    v-for="month in months"
    :key="month.date.toISOString()"
    class="month-card"
  >

    <div class="month-name">
      {{ month.name }}
    </div>

    <div class="points">
      ⭐ {{ month.points }}
    </div>

  </div>

</div>

</template>

<style scoped>

.year-view{
display:grid;
grid-template-columns: repeat(4,1fr);
gap:20px;
padding:20px;
}

.month-card{
border:1px solid #ccc;
border-radius:8px;
padding:20px;
text-align:center;
}

.month-name{
font-size:18px;
font-weight:bold;
}

.points{
margin-top:10px;
color:goldenrod;
}

</style>