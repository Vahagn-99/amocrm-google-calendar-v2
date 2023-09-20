<template>
  <div class="max-w-2xl p-4 mx-auto">
    <div
      id="drawer-example"
      class="dct-drawer dct-drawer-fixed z-40 h-screen p-4 overflow-y-auto bg-slate-50 w-2/5 dct-modal"
      tabindex="-1"
      aria-labelledby="drawer-label"
    >
      <button
        @click="closeModal"
        id="drawer-hide-button"
        type="button"
        aria-controls="drawer-example"
        class="dct-button text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="sr-only">Close menu</span>
      </button>
      <div class="mt-6">
        <div>
          <Select
              :selected="settings.user_id"
              optionKey="name"
              :options="users"
              selected-key="id"
              name="users"
              label="Пользователь"
              @update:value="handleUser"
          />
        </div>
        <div class="mt-2">
          <div class="w-[20%]">
            <Input type="number" label="Количество лидов" name="count" :modelValue="settings.count" @update:modelValue="handleCount"/>
          </div>
        </div>
        <div>
          <div class="dct-block border-t mt-2">
            <div class="my-4 relative">
              <div class="flex">
                <label
                    for="description"
                    class="dct-label block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Статусы для учёта активных сделок
                </label>
              </div>
              <div
                  @click="openStatusTemplate($event)"
                  class="dct-shablon-element bg-white border-2 border-solid rounded-lg border-gray-300 dark:border-gray-600 min-h-[85px]"
              >
                <template
                    v-for="(status, key) in settings.statuses ?? []"
                    :key="key"
                >
                    <span
                        :id="'dct-elem-status-'+status.id"
                        class="inline-flex items-center px-2 py-1 m-2 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
                    >
                      {{ status.name}}
                      <button
                          @click="deleteStatusItem(status)"
                          type="button"
                          class="inline-flex items-center p-1 ml-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
                          data-dismiss-target="#badge-dismiss-default"
                          aria-label="Remove"
                      >
                        <svg
                            class="w-2 h-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                          <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                        <span class="sr-only">Remove badge</span>
                      </button>
                    </span>
                </template>
              </div>
            </div>
            <div class="w-full flex justify-end">
              <button
                  @click="toggleStatusTemplate($event)"
                  type="button"
                  class="text-white bg-[#4c8bf7] hover:bg-[#5c8bf9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {{ isStatusTemplate ? "Закрыть" : "Добавить статусы " }}
              </button>
            </div>
            <div class="pt-4" v-if="isStatusTemplate">
              <div class="h-[200px] overflow-y-auto custom-scroll">
                <ul class="dct-ul mt-0 pl-0">
                  <template v-for="(pipeline, key) in statuses" :key="key">
                    <li class="p-2 flex font-bold rounded justify-start items-center cursor-pointer hover:bg-slate-100 dct-select-item" @click="addPipelineItems(pipeline.options)">{{pipeline.name}} ։ Выбрать все
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-4 h-4 ml-1"
                      >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                        />
                      </svg>
                    </li>
                    <template v-for="(status, sub) in pipeline.options" :key="sub">
                      <li class="border-gray-400">
                        <ul class="dct-ul border-gray-400 mt-0">
                          <ShablonItem
                              @copy:value="addNewStatus(name, status)"
                              :item="status"
                              showKey="name"
                              copyKey="name"
                              :group="pipeline.name"
                              :disabled="status.id===142||status.id===143"
                          />
                        </ul>
                      </li>
                    </template>
                  </template>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <label class="dct-label block mb-1 text-sm font-medium text-gray-900 dark:text-white">Статусы не участвующие в учете сделок (статичный параметр)</label>
          <div class="bg-white  border-2 border-solid rounded-lg border-gray-300">
              <div class="opacity-50 p-2">
                   <span
                       class="inline-flex items-center px-2 py-1 m-2 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
                   >Закрыто и не реализовано</span>
                <span
                    class="inline-flex items-center px-2 py-1 m-2 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
                >Успешно реализовано</span>
              </div>
          </div>
        </div>
        <div class="mt-4">
          <Select
              :selected="settings.tech_id"
              optionKey="name"
              :options="users"
              selected-key="id"
              name="tech_users"
              label="Технический пользователь (биржа)"
              @update:value="handleTechUser"
          />
        </div>
      </div>
      <div class="flex justify-between w-full mt-4 sm:py-2">
        <button
          @click="closeModal"
          type="button"
          class="dct-button text-gray-500 bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:focus:ring-gray-600"
        >
          Закрыть
        </button>
        <button
          @click="handleSave"
          type="button"
          class="dct-button text-white bg-[#4c8bf7] hover:bg-[#5c8bf9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {Drawer} from "flowbite";
import {onMounted, ref} from "vue";
import {useSettingsStore} from "../stores/settings";
import {useSelectStore} from "../stores/select";
import ShablonItem from "./ShablonItem.vue";
import {storeToRefs} from "pinia";
import Select from "./inputs/Select.vue";
import Input from "./inputs/Input.vue";

const settingsStore = useSettingsStore();
const selectStore = useSelectStore();

const { settings } = storeToRefs(settingsStore);
const { statuses,users } = storeToRefs(selectStore);

const drawerInstance = ref(null); // Create a ref for the drawer instance
const emit = defineEmits(["close-drawer"]);

async function handleSave() {
  await settingsStore.saveSettings();
  closeModal();
  if (drawerInstance.value) {
    drawerInstance.value.hide(); // Hide the drawer after saving
  }
}

onMounted(async () => {
  const $targetEl = document.getElementById("drawer-example");
  const options = {
    placement: "right",
    backdrop: false,
    bodyScrolling: false,
    edge: false,
    edgeOffset: "",
    onHide: () => {
      emit("close-drawer");
    },
    onShow: () => {},
    onToggle: () => {},
  };
  if ($targetEl) {
    drawerInstance.value = new Drawer($targetEl, options); // Assign the drawer instance to the ref
    drawerInstance.value.show();
  }
});
</script>
