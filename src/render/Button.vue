<template v-if="exist">
  <button class="dct-double-button ml-2" @click="openModal($event)"
  >
    <span class="dct-double-btn-text">
      Биржа лидов : <span class="mr-2 font-semibold">{{ leads.length }}</span>
      <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="16px"
          height="16px"
      >
                <path
                    fill="#363b44"
                    d="M 19.980469 2.9902344 A 1.0001 1.0001 0 0 0 19.869141 3 L 15 3 A 1.0001 1.0001 0 1 0 15 5 L 17.585938 5 L 8.2929688 14.292969 A 1.0001 1.0001 0 1 0 9.7070312 15.707031 L 19 6.4140625 L 19 9 A 1.0001 1.0001 0 1 0 21 9 L 21 4.1269531 A 1.0001 1.0001 0 0 0 19.980469 2.9902344 z M 5 3 C 3.9069372 3 3 3.9069372 3 5 L 3 19 C 3 20.093063 3.9069372 21 5 21 L 19 21 C 20.093063 21 21 20.093063 21 19 L 21 13 A 1.0001 1.0001 0 1 0 19 13 L 19 19 L 5 19 L 5 5 L 11 5 A 1.0001 1.0001 0 1 0 11 3 L 5 3 z"
                />
              </svg>
    </span>
  </button>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {mountComponent} from "../helpers/mounter";
import Modal from "./Modal.vue";
import {useSettingsStore} from "../stores/settings";
import {useModalStore} from "../stores/modal";
import {useAmoStore} from "../stores/amocrm";
import {storeToRefs} from "pinia";
import {useSelectStore} from "../stores/select";

const settingsStore = useSettingsStore();
const modalStore = useModalStore();

const amoStore = useAmoStore();
const user = amoStore.user;
const {leads} = storeToRefs(modalStore);
const {settings, settingsList, getSettingsList} = storeToRefs(settingsStore);
const selectStore = useSelectStore();
const exist = ref(false)

function openModal(event) {
  event.preventDefault();

  document
      .getElementById("dct_leads_exchange_modal")
      .classList.remove("hidden");
}

onMounted(async () => {
  await settingsStore.getSettingsList();
  exist.value = settingsList.value.map(obj => obj.user_id).includes(user.id)
  console.log(settingsList.value.map(obj => obj.user_id), user.id)
  if (exist.value) {
    await selectStore.getStatuses()
    await modalStore.getCurrentLeads(user.id)
    await mountComponent("lead-exchange-modal", Modal, "body", "leads-pipeline", true);
    await modalStore.getLeads(settings.value.tech_id)

  }

});
</script>
