<script setup lang="ts">

import { computed } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useCalendarStore } from "../../../../stores/calendarStore"

const router = useRouter()
const route = useRoute()
const calendarStore = useCalendarStore()
const year = computed(() => Number(route.params.year))

const months = computed(() => {

  const monthNames = [
    "Jan","Fev","Mar","Abr","Mai","Jun",
    "Jul","Ago","Set","Out","Nov","Dez"
  ]

  return monthNames.map((name, index) => {

    return {
      name,
      date: new Date(year.value, index, 1),
      points: 0
    }

  })

})

function openMonth(monthIndex: number) {

  router.push({
    name: "month",
    params: {
      year: year.value,
      month: monthIndex + 1
    }
  })

}

</script>

<template>

<div class="year-view">

  <div
    v-for="(month, index) in months"
    :key="month.date.toISOString()"
    class="month-card"
    @click="openMonth(index)"
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

.month{
border:1px solid #ccc;
padding:20px;
cursor:pointer;
border-radius:6px;
}

.month:hover{
background:#f5f5f5;
}

</style>