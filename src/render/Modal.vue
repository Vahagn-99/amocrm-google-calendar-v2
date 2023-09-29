<template>
  <div
      class="modal dct_calendar_modal hidden"
      id="dct_calendar_modal"
  >
    <div class="modal-scroller custom-scroll">
      <div class="modal-body modal-body-relative overflow-auto block w-[80%] h-[95%] my-[10px] p-[23px] custom-scroll">
        <div class="modal-body__inner">
          <div class="add-group">
            <div class="add-group__header">
              <h2 class="modal-body__caption head_2">
                События «Google Календаря»
              </h2>
              <span class="modal-body__close" @click="closeModal">
                <span class="icon icon-modal-close"></span>
              </span>
            </div>
            <div class="add-group__item">
              <Calendar/>
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
import { useSettingsStore } from "../stores/settings";
import Calendar from "../calendar/Calendar.vue";

function closeModal() {
  document.getElementById("dct_calendar_modal").classList.add("hidden");
}
</script>
