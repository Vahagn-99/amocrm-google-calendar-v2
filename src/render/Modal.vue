<template>
  <div class="modal dct_calendar_modal hidden" id="dct_calendar_modal">
    <div class="modal-scroller custom-scroll">
      <span
        class="modal-body__close p-[7px] top-0"
        @click="closeModal"
        style="right: calc(5% - 44px)"
      >
        <svg
          width="36px"
          height="36px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
              fill="#c5c5c5"
            ></path>
          </g>
        </svg>
      </span>
      <div
        class="modal-body modal-body-relative overflow-auto block w-[90%] h-full my-[10px] p-[23px] custom-scroll"
      >
        <div class="modal-body__inner">
          <div class="add-group">
            <div class="add-group__header">
              <h2 class="modal-body__caption head_2">
                События «Google Календаря»
              </h2>
            </div>
            <div class="add-group__item">
              <Calendar />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSettingsStore } from "../stores/settings";
import Calendar from "../calendar/Calendar.vue";

function closeModal() {
  document.getElementById("dct_calendar_modal").classList.add("hidden");
}
</script>
