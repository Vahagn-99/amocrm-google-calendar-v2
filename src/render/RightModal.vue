<template>
  <div
      class="modal dct_calendar_right_modal hidden"
      id="dct_calendar_right_modal"
  >
    <div class="modal-scroller custom-scroll">
      <div
          class="modal-body modal-body-relative bg-white block dct-drawer-fixed z-40 p-4 overflow-y-auto w-[30%] right-0 top-0 m-0 h-full">
        <div class="modal-body__inner">
          <div class="add-group">
            <div class="add-group__header">
              <div class="dct-pipeline_cell-head ">
              </div>
              <span class="modal-body__close" @click="closeModal">
                <span class="icon icon-modal-close"></span>
              </span>
            </div>
            <div class="add-group__item dct-add-group__item">
              <div class="calendar-event-title">
                <h2 class="text-[16px]">
                  {{ eventsStore.currentEvent.title ?? 'Без названия' }}
                </h2>
              </div>
              <div class="mt-5">
                <label class="font-bold my-1">
                  Дата начала
                </label>
                <p>{{ eventsStore.currentEvent.start ?? '-' }}</p>
              </div>
              <div class="mt-4">
                <label class="font-bold my-1">
                  Дата окончания
                </label>
                <p>{{ eventsStore.currentEvent.end ?? '-'}}</p>
              </div>
              <div class="mt-4">
                <label class="font-bold my-1">
                  Название календаря
                </label>
                <p> {{ eventsStore.currentEvent.calendar??'-' }}</p>
              </div>
              <div class="mt-4">
                <label class="font-bold my-1">
                  Описание
                </label>
                <p>
                  {{ eventsStore.currentEvent.description ??'-'}}
                </p>
              </div>
              <div class="mt-4">
                <label class="font-bold my-1">
                  Ссылка на сделку
                </label>
                <a class="block" v-if="eventsStore.currentEvent.url" :href="eventsStore.currentEvent.url">
                  {{ eventsStore.currentEvent.url}}
                </a>
                <p v-else>
                  Сделка не найдено
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
        class="default-overlay modal-overlay modal-overlay--filled default-overlay-visible"
    >
      <span
          class="modal-overlay__spinner spinner-icon spinner-icon-abs-center hidden"
      ></span>
    </div>
  </div>
</template>

<script setup>
import {useEventsStore} from "../stores/events";

const eventsStore = useEventsStore()
console.log(eventsStore.currentEvent)

function closeModal() {
  document.querySelector('#dct_calendar_right_modal').classList.add('hidden')
}

</script>
