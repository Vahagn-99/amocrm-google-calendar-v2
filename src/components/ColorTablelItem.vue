<template>
  <tr class="border-b">
    <td scope="row" class="pr-4 py-3">
      <div class="flex items-center">
        <input
          v-model="item.item"
          type="text"
          min="0"
          class="dct-input h-[42px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </td>
    <td class="py-3 flex items-center justify-center">
      <button
        @click="handleDelete"
        type="button"
        data-modal-target="delete-modal"
        data-modal-toggle="delete-modal"
        class="dct-button h-[42px] flex items-center text-[#ff6e6e] hover:text-white border border-[#ff6e6e] hover:bg-[#f45050] focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 mr-2 -ml-0.5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
        Удалить
      </button>
    </td>
  </tr>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useSettingsStore } from "../stores/settings";

const settingsStore = useSettingsStore();
const { settings } = storeToRefs(settingsStore);

const props = defineProps({
  item: Object,
  index: Number,
});

async function handleDelete() {
  settings.value.items.splice(props.index, 1);
  await settingsStore.saveSettings();
}
</script>
