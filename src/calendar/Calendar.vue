<template>
  <div class="flex flex-start gap-4 justify-start">
    <div class="w-full">
      <CalendarSide/>
    </div>
    <div class="w-full">
      <div class='demo-app'>
        <div class='demo-app-main'>
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
import CalendarSide from "./CalendarSide.vue";

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

const handleEventClick = async (clickInfo) => {
  const event = clickInfo.event
  eventsStore.currentEvent = {
    start: handleDate(event.start),
    end: handleDate(event.end),
    title: event.title,
    description: event.extendedProps.description,
    calendar: calendarStore.calendars.find((item) => item.id === event.extendedProps.calendar_id).summary
  }
  await eventsStore.getLeadUrl(currentAccountId.value, event.id)
  document.querySelector('#dct_calendar_right_modal').classList.remove('hidden')

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
  eventClick: handleEventClick,
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
  let filteredEvents =[];
  if(events.value.length > 0) {
    filteredEvents = events.value
        .filter(event => checkedCalendars.value.includes(event.calendar_id))
  }

  calendarOptions.events = filteredEvents
}

onMounted(async () => {
  await changeAccount();
  checkedCalendars.value = calendarStore.calendars.map(calendar => calendar.id)
})


</script>
