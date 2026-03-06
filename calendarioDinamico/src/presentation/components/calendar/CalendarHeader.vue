<script setup lang="ts">

import { useCalendarStore } from "../../../stores/calendarStore"

const calendarStore = useCalendarStore()

</script>

<template>

<div class="calendar-header">

<button @click="calendarStore.previous()">◀</button>

<button @click="calendarStore.setView('day')">Dia</button>
<button @click="calendarStore.setView('week')">Semana</button>
<button @click="calendarStore.setView('month')">Mês</button>
<button @click="calendarStore.setView('year')">Ano</button>

<button @click="calendarStore.next()">▶</button>

</div>

</template>