<template>
  <div>
    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
      Настройка календарей
    </h2>
  </div>
  <template v-for="(calendar,key) in calendarSettingsStore.calendars" :key="key">
    <CalendarItem :calendar="calendar" :g-key="key"/>
  </template>
  <button
      @click="addCalendar"
      type="button"
      class="dct-button mt-4 float-right text-white bg-[#2589ff] hover:bg-[#5c8bf9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#2589ff] dark:hover:bg-[#2589ff] dark:focus:ring-blue-800"
  >
    Добавить календарь
  </button>
</template>

<script setup>
import {useCalendarSettingsStore} from "../stores/calendar_settings";
import {useSettingsStore} from "../stores/settings";
import {onMounted} from "vue";
import CalendarItem from "./CalendarItem.vue";

const calendarSettingsStore = useCalendarSettingsStore()
const settingsStore=useSettingsStore()
function addCalendar() {
  calendarSettingsStore.calendars.push({
    id:'',
    summary: '',
    description: '',
    acl: []
  })
}

onMounted(()=>{
  calendarSettingsStore.getCalendars(settingsStore.settings.google_account_id)
})
</script>