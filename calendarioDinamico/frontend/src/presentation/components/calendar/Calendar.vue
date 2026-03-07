<script setup lang="ts">

import { computed } from "vue"
import { useCalendarStore } from "../../../stores/calendarStore"

import CalendarHeader from "./CalendarHeader.vue"

import CalendarDayView from "./views/CalendarDayView.vue"
import CalendarWeekView from "./views/CalendarWeekView.vue"
import CalendarMonthView from "./views/CalendarMonthView.vue"
import CalendarYearView from "./views/CalendarYearView.vue"

const calendarStore = useCalendarStore()

const currentView = computed(() => {

  switch (calendarStore.view) {

    case "day":
      return CalendarDayView

    case "week":
      return CalendarWeekView

    case "month":
      return CalendarMonthView

    case "year":
      return CalendarYearView
  }

})

</script>

<template>

<div class="calendar">

  <CalendarHeader />

  <component :is="currentView" />

</div>

</template>