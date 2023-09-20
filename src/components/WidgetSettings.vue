<template>
  <section class="dark:bg-gray-900 antialiased">
    <SettingsModal v-if="showDrawer" @close-drawer="hideSettings" />
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useSettingsStore } from "../stores/settings";
import SettingsModal from "./SettingsModal.vue";
import { storeToRefs } from "pinia";
import { useSelectStore } from "../stores/select";
import { useAccountStore } from "../stores/account";

const settingsStore = useSettingsStore();
const selectStore = useSelectStore();
const accountStore = useAccountStore();

const { settings } = storeToRefs(settingsStore);
const { accounts } = storeToRefs(accountStore);

const showDrawer = ref(false);
const isLoadingId = ref(null);

async function deleteAccount(id) {
  await accountStore.destroyAccount(id);
}

function hideSettings() {
  settingsStore.$reset();
  showDrawer.value = false;
}

function showSettings(item) {
  settings.value = item;
  showDrawer.value = true;
  isLoadingId.value = null;
}

onMounted(async () => {
  await accountStore.getAccounts();
  await selectStore.getFields();
  await selectStore.getStatuses();
  await selectStore.getSelects();
});
</script>
