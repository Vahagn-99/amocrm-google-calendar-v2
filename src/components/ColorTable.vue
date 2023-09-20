<template>
  <div>
    <table
      class="dct-table dct-table-color w-full text-sm text-left text-gray-500 dark:text-gray-400"
    >
      <thead class="text-gray-900 font-bold">
        <tr>
          <td scope="col" class="py-3 w-full">Пункт чек листа</td>
        </tr>
      </thead>
      <tbody class="border-b">
        <template v-for="(setting, key) in items" :key="key">
          <ColorTablelItem :item="setting" :index="key" />
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import ColorTablelItem from "./ColorTablelItem.vue";
import { storeToRefs } from "pinia";
import { useSettingsStore } from "../stores/settings";
// store
const settingsStore = useSettingsStore();
const { settings } = storeToRefs(settingsStore);
// props
const props = defineProps({
  items: Object,
});
</script>
