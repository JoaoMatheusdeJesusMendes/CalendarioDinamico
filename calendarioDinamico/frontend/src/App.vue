<script setup lang="ts">

import CalendarViewSwitcher from "@/presentation/components/calendar/CalendarViewSwitcher.vue"

</script>

<template>

<div>

  <CalendarViewSwitcher />

  <RouterView :key="$route.fullPath" />

</div>

</template>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
