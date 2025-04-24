<template>
  <div>
    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
      Настройка календарей
    </h2>
  </div>
  <template v-for="(calendar,key) in calendarSettingsStore.calendars" :key="key">
    <CalendarItem :calendar="calendar" :g-key="key"/>
  </template>
  <button type="button" @click="addCalendar"
          class="dct-button mt-4 float-right flex justify-center items-center focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#2a7cef] hover:bg-[#5c8bf9]">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
         class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
    </svg>
    Добавить календарь
  </button>

</template>

<script setup>
import {useCalendarSettingsStore} from "../stores/calendar_settings";
import {useSettingsStore} from "../stores/settings";
import {onMounted} from "vue";
import CalendarItem from "./CalendarItem.vue";

const calendarSettingsStore = useCalendarSettingsStore()
const settingsStore = useSettingsStore()

function addCalendar() {
  calendarSettingsStore.calendars.push({
    id: '',
    summary: '',
    description: '',
    acl: []
  })
}


</script>