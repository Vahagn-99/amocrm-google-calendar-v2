<template>
  <div v-if="calendar.id" @click='toggle'
       class="dct-calendar-item-close my-2 bg-[#f5f5f5] rounded-lg flex items-center justify-start p-[8px]">
    <svg v-if="!show" viewBox="0 0 32 32" version="1.1" class="w-[32px] h-[32px] dct-angle-circle-left"
         xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <g id="icomoon-ignore"></g>
        <path d="M19.159 16.767l0.754-0.754-6.035-6.035-0.754 0.754 5.281 5.281-5.256 5.256 0.754 0.754 3.013-3.013z"
              fill="#000000"></path>
      </g>
    </svg>
    <svg v-else viewBox="0 0 32.00 32.00" class="w-[32px] h-[32px] dct-angle-circle-down" version="1.1"
         xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"
         transform="rotate(90)">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <g id="icomoon-ignore"></g>
        <path d="M19.159 16.767l0.754-0.754-6.035-6.035-0.754 0.754 5.281 5.281-5.256 5.256 0.754 0.754 3.013-3.013z"
              fill="#000000"></path>
      </g>
    </svg>
    <span class="font-medium mx-2">{{ calendar.summary }}</span>
  </div>
  <div v-if="show" class="dct-calendar-item">
    <div>
      <Input
          label="Название календаря"
          name="summary"
          v-model="calendar.summary"
      />
    </div>
    <div>
      <CalendarEmails :emails="calendar.acl" :g-key="gKey"/>
      <div class="flex gap-1 justify-end">
        <button
            type="button"
            @click="deleteCalendar(gKey)"
            class="bg-[#fff] border border-solid h-[39px] w-max flex items-center justify-center text-[#ff6e6e] hover:text-white hover:bg-[#f45050] focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm py-2 px-2 text-center"
        >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-2 -ml-0.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
          >
            <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
            ></path>
          </svg>
          Удалить календарь
        </button>
      </div>
    </div>
  </div>

</template>
<script setup>
import Input from "./inputs/Input.vue";
import {useCalendarSettingsStore} from "../stores/calendar_settings";
import {useSettingsStore} from "../stores/settings";
import {ref} from "vue";
import CalendarEmails from "./CalendarEmails.vue";
import apiClient from "../../apiClient";
import {notify} from "@kyvg/vue3-notification";

const props = defineProps({
  calendar: Object,
  gKey: Number,
});

const show = ref(props.calendar.id ? false : true)
const calendarSettingsStore = useCalendarSettingsStore()
const settingsStore = useSettingsStore()

async function deleteCalendar(key) {
  try {
    if (props.calendar.id) {
      await calendarSettingsStore.deleteCalendar(settingsStore.settings.google_account_id, props.calendar.id)
    }
    calendarSettingsStore.calendars.splice(key, 1)
    show.value = false
  } catch (error) {

  }
}


function toggle() {
  show.value = !show.value
}


</script>