<template>
  <div>
    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
      Настройка календарей
    </h2>
  </div>
  <template v-for="(calendar,key) in calendarSettingsStore.calendars" :key="key">
    <div class="dct-border-b">
      <div class="flex gap-1 justify-end">
        <div class="flex gap-1">
          <button
              type="button"
              @click="deleteCalendar(key)"
              class="dct-button  h-[39px] w-max flex items-center justify-center text-[#ff6e6e] hover:text-white border border-[#ff6e6e] hover:bg-[#f45050] focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm py-2 px-2 text-center"
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
          <button
              @click="saveCalendar(calendar)"
              type="button"
              class="dct-button px-10 text-white bg-[#4c8bf7] hover:bg-[#5c8bf9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Сохранить
          </button>
        </div>
      </div>
      <div>
        <Input
            label="Название"
            name="summary"
            v-model="calendar.name"
        />
      </div>
      <div>
        <div class="flex">
          <label
              class="dct-label mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >Описание</label>
        </div>
        <textarea v-model="calendar.description"
                  class="dct-textarea block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
      </textarea>
      </div>
      <div>
        <div>
          <label
              class="dct-label mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >Электронная почта </label>
        </div>
        <template v-for="(email, acc_key) in calendar.emails" :key="acc_key">
          <div class="flex justify-center items-end gap-2">
            <div class="mt-2 w-full">
              <Input
                  :name="'email_' + acc_key"
                  v-model="calendar.emails[acc_key]"
              />
            </div>
            <div class="w-[25%] mt-2">
              <button
                  type="button"
                  @click="deleteAccount(key,acc_key)"
                  class="dct-button w-full h-[39px] flex items-center justify-center text-[#ff6e6e] hover:text-white border border-[#ff6e6e] hover:bg-[#f45050] focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm py-2 px-2 text-center"
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
                Удалить
              </button>
            </div>
          </div>
        </template>
        <div class="flex justify-end items-center">
          <button
              @click="addAccount(key)"
              type="button"
              class="dct-button my-4 text-white bg-[#4c8bf7] hover:bg-[#5c8bf9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Добавить аккаунт
          </button>
        </div>
      </div>
    </div>
  </template>
  <button
      @click="addCalendar"
      type="button"
      class="dct-button mt-4 float-right text-white bg-[#4c8bf7] hover:bg-[#5c8bf9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    Добавить календарь
  </button>
</template>
<script setup>
import {useCalendarSettingsStore} from "../stores/calendar_settings";
import Input from "./inputs/Input.vue";
import {useSettingsStore} from "../stores/settings";
import {onMounted} from "vue";

const calendarSettingsStore = useCalendarSettingsStore()
const settingsStore=useSettingsStore()
function addCalendar() {
  calendarSettingsStore.calendars.push({
    id:'',
    name: '',
    description: '',
    emails: [""]
  })
}

function deleteCalendar(key) {
  calendarSettingsStore.calendars.splice(key, 1)

}

function deleteAccount(key, acc_key) {
  calendarSettingsStore.calendars[key].emails.splice(acc_key, 1)

}

function saveCalendar(calendar) {
  const accout_id=settingsStore.settings.google_account_id
  calendarSettingsStore.saveCalendar(accout_id,calendar)
}

function addAccount(key) {
  calendarSettingsStore.calendars[key].emails.push("")
}

onMounted(()=>{
  calendarSettingsStore.getCalendars(settingsStore.settings.google_account_id)
})
</script>