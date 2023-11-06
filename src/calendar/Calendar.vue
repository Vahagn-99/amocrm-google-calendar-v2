<template>
  <div class='demo-app'>
    <div class='demo-app-main'>
      <div class="flex justify-start items-center gap-2 my-2">
        <div>
          <div @click="openList"
            class="dct-calendars-select dct-select-v2 text-center px-2 flex gap-4 items-center justify-between h-[33px] min-w-[200px]">
            <span class="block">
              {{ checkedCalendars.length }} календарей
            </span>
            <span class="fc-icon fc-icon-chevron-right" :class="isOpen ? ' dct-transform-up' : ' dct-transform-down'"></span>
          </div>
          <ul
            class="dct-calendars-select-list flex gap-3 p-4 mt-[3px] border-[#efefef] flex-col bg-[#f5f5f5] absolute z-50 border border-solid"
            v-if="isOpen">
            <li v-for="(calendar, key) in calendarStore.calendars" :key="key">
              <label class="flex gap-1">
                <input type="checkbox" :value="calendar.id" style="accent-color: #2a7cef;"
                  @click="getCheckedCalendars(calendar.id)" :checked="checkedCalendars.includes(calendar.id)">{{
                    calendar.summary }}
              </label>
            </li>
          </ul>
        </div>
        <div class="dct-page-h" v-if="accounts.length > 1">
          <div class="fc">
            <div class="fc-button-group h-[28px]">
              <button type="button" title="Пред" @click="prevAccount" aria-pressed="false"
                class="max-w-[54px] fc-prev-button fc-button fc-button-primary" style="height: 28px">
                <span class="fc-icon fc-icon-chevron-left"></span></button>
              <div class="bg-[#f5f5f5] text-center px-8 flex items-center">
                {{ accounts[currentAccountIndex].name }}
              </div>
              <button type="button" @click="nextAccount" title="След" aria-pressed="false"
                class="max-w-[54px] fc-next-button fc-button fc-button-primary" style="height: 28px">
                <span class="fc-icon fc-icon-chevron-right"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <FullCalendar class='demo-app-calendar' :options='calendarOptions'>
        <template v-slot:eventContent='arg'>
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
  </div>
  <div v-if="loader" class="absolute w-full h-full top-0 left-0 bg-[#f5f5f5f5] flex justify-center items-center "
    style="z-index: 99999999999999999">
    <div role="status">
      <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#2a7cef]"
        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor" />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill" />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';
import ruLocale from '@fullcalendar/core/locales/ru';
import esLocale from '@fullcalendar/core/locales/es';

import { onMounted, reactive, ref } from "vue";
import { useEventsStore } from "../stores/events";
import { storeToRefs } from "pinia";
import { useAccountStore } from "../stores/account";
import { useCalendarSettingsStore } from "../stores/calendar_settings";
import { mountComponent } from "../helpers/mounter";
import CalendarModal from "../render/Modal.vue";
import RightModal from "../render/RightModal.vue";

const accountStore = useAccountStore()
const { accounts } = storeToRefs(accountStore);
const currentAccountIndex = ref(0)
const currentAccountId = ref(accountStore.accounts[0].id)
const eventsStore = useEventsStore()
const calendarStore = useCalendarSettingsStore()
const loader = ref(true)
const { events } = storeToRefs(eventsStore);
const checkedCalendars = ref([]);
const isOpen = ref(false)

const handleEventClick = (clickInfo) => {
  document.querySelector('#dct_calendar_right_modal').classList.remove('hidden')
  const event = clickInfo.event
  eventsStore.getEventUrl(currentAccountId.value, event.id)
  eventsStore.currentEvent = {
    start: handleDate(event.start),
    end: handleDate(event.end),
    title: event.title,
    description: event.extendedProps.description,
    calendar: calendarStore.calendars.find((item) => item.id === event.extendedProps.calendar_id).summary
  }
  handleDate(clickInfo.event.start)
}

function handleDate(dateString, isFull = true) {

  if (!dateString) {
    return dateString
  }
  let dateObject = new Date(dateString);

  // Create options for formatting the date and time in Russian
  let date = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };
  let time = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Use 24-hour format
  };

  let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Use 24-hour format
  };


  if (isFull) {
    return dateObject.toLocaleString('ru-RU', options)
  }
  return {
    date: dateObject.toLocaleString('ru-RU', date),
    time: dateObject.toLocaleString('ru-RU', time),
  }
}

const calendarOptions = reactive({
  plugins: [
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin,
    listPlugin,

  ],
  headerToolbar: {
    left: 'prev,next,today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
  },
  initialView: 'dayGridMonth',
  events: events.value, // alternatively, use the `events` setting to fetch from a feed
  slotDuration: '00:30:00',
  slotLabelFormat: {
    hour: '2-digit',
    minute: '2-digit'
  },
  editable: false,
  selectable: false,
  selectMirror: false,
  dayMaxEvents: true,
  weekends: true,
  // select: handleDateSelect,
  eventClick: handleEventClick,
  // eventsSet: handleEvents,
  locales: [ruLocale, esLocale],
  locale: ruLocale,
  buttonText: {
    list: 'Список событий'
  },
});


function openList() {
  isOpen.value = !isOpen.value
}

async function changeAccount() {
  loader.value = true
  currentAccountId.value = accounts.value[currentAccountIndex.value].id
  await calendarStore.getCalendars(currentAccountId.value)
  checkedCalendars.value = calendarStore.calendars.map(calendar => calendar.id)
  await eventsStore.getEvents(currentAccountId.value)
  await eventsStore.getColors(currentAccountId.value)
  getEvents()
  loader.value = false
}

function nextAccount() {
  if (currentAccountIndex.value < accounts.value.length - 1) {
    currentAccountIndex.value += 1
  } else {
    currentAccountIndex.value = 0
  }
  changeAccount()
}

function prevAccount() {
  if (currentAccountIndex.value > 0) {
    currentAccountIndex.value -= 1
  } else {
    currentAccountIndex.value = accounts.value.length - 1
  }
  changeAccount()
}

function getCheckedCalendars(calendarId) {
  if (checkedCalendars.value.includes(calendarId)) {
    checkedCalendars.value = checkedCalendars.value.filter(id => id !== calendarId);
  } else {
    checkedCalendars.value.push(calendarId);
  }

  getEvents()
}

function getEvents() {

  let filteredEvents = events.value
    .filter(event => checkedCalendars.value.includes(event.calendar_id))

  console.log(filteredEvents)

  calendarOptions.events = filteredEvents
}

onMounted(async () => {

  console.log('test')
  await changeAccount();
  checkedCalendars.value = calendarStore.calendars.map(calendar => calendar.id)


  // Function to handle the click event
  function handleClickOutside(event) {
    const targetElement = document.querySelector('.dct-calendars-select');
    const targetElementLabels = document.querySelectorAll('.dct-calendars-select-list label');

    if (targetElement) {

      let isOutside = true;
      console.log(event.target)
      console.log(targetElementLabels)
      targetElementLabels.forEach(item => {
        if (item.contains(event.target)) {
          isOutside = false;
        }
      });

      if (!targetElement.contains(event.target) && isOutside && isOpen.value) {
        isOpen.value = false;
      }
    }

  }

  document.addEventListener('click', handleClickOutside);
})


</script>
