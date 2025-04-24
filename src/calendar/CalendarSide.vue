<template>
    <div>
      <ul
        class=" flex gap-3 p-4 mt-[3px] border-[#efefef] flex-col bg-[#f5f5f5] border border-solid"
        >
        <li v-for="(calendar, key) in calendarStore.calendars" :key="key">
          <label class="flex gap-1">
            <input type="checkbox" :value="calendar.id" style="accent-color: #2a7cef;"
              @click="getCheckedCalendars(calendar.id)" :checked="checkedCalendars.includes(calendar.id)">{{
                calendar.summary }}
          </label>
        </li>
      </ul>
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
