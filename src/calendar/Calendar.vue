<template>
  <div class='demo-app'>
    <div class='demo-app-main'>
      <FullCalendar
          class='demo-app-calendar'
          :options='calendarOptions'
      >
        <template v-slot:eventContent='arg'>
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
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

import {INITIAL_EVENTS, createEventId} from '../stores/events'
import {onMounted, reactive, ref} from "vue";
import {useEventsStore} from "../stores/events";

let currentEvents = []
const eventsStore=useEventsStore()
console.log('-------')
console.log(eventsStore.events)
console.log('------')
const handleDateSelect = (selectInfo) => {
  let title = prompt('Please enter a new title for your event')
  let calendarApi = selectInfo.view.calendar

  calendarApi.unselect() // clear date selection

  if (title) {
    calendarApi.addEvent({
      id: createEventId(),
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay
    })
  }
}

const handleEventClick = (clickInfo) => {
  if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    clickInfo.event.remove()
  }
}

const handleEvents = (events) => {
  currentEvents = events
}

console.log(eventsStore.events)

const calendarOptions = reactive({
  plugins: [
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin,
    listPlugin,

  ],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
  },
  initialView: 'dayGridMonth',
  events: eventsStore.events, // alternatively, use the `events` setting to fetch from a feed
  slotDuration:'00:30:00',
  editable: false,
  selectable: false,
  selectMirror: false,
  dayMaxEvents: true,
  weekends: true,
  // select: handleDateSelect,
  // eventClick: handleEventClick,
  // eventsSet: handleEvents,
  locales: [ruLocale, esLocale],
  locale: ruLocale
});


onMounted(async () => {
  await eventsStore.getEvents()
  console.log('-------')
  console.log(eventsStore.events)
  console.log('------')
})


</script>
