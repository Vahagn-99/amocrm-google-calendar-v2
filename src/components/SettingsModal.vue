<template>
  <div class="max-w-2xl p-4 mx-auto">
    <div
      id="drawer-example"
      class="dct-drawer dct-drawer-fixed z-40 h-screen pb-[120px] p-0 overflow-y-auto bg-[#f5f5f5]  dct-modal hidden"
      tabindex="-1"
      aria-labelledby="drawer-label"
      style="width: calc(100% - 338px)"
    >
      <div
          class="flex justify-end sticky top-0 bg-white px-[20px] py-2 w-full z-20 gap-2"
      >
        <button
            @click="closeModal"
            type="button"
            class="text-gray-500 border-[2px] border-solid border-[#efefef] bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-1.5 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:focus:ring-gray-600"
        >
          Закрыть
        </button>
        <button
            @click="handleSave"
            type="button"
            class="dct-button text-white bg-[#2a7cef] hover:bg-[#5c8bf9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center dark:bg-[#2a7cef] dark:hover:bg-[#2a7cef] dark:focus:ring-blue-800"
            :class="calendarSettingsStore.loader ? 'pointer-events-none' : ''"
        >
          Сохранить
        </button>
      </div>
      <div class=" bg-[#f5f5f5]">
        <div class="flex justify-start gap-4 items-center p-[20px] pb-0" >
          <div
              @click="changeTab('main')"
            :class="showTabs['main'] ? 'dct-active-tab' : ''"
            class="dct-drawer-tab"
          >
              Настройки статуса и событий
          </div>
          <div
              @click="changeTab('calendar')"
            :class="showTabs['calendar'] ? 'dct-active-tab' : ''"
            class="dct-drawer-tab"
          >
            Настройка календарей
          </div>
          <div
              @click="changeTab('additional')"
              :class="showTabs['additional'] ? 'dct-active-tab' : ''"
              class="dct-drawer-tab"
          >
            Дополнительные настройки
          </div>
        </div>
        <div
          class="dct-drawer-main-section w-full h-fit bg-[#f5f5f5] z-10"
          :style="calendarSettingsStore.loader ? 'overflow:hidden' : ''"
        >
          <div v-if="showTabs['main']" class="flex gap-6 w-full h-full bg-[#f5f5f5]">
            <div class="flex flex-col gap-6 w-[45%] bg-[#f5f5f5]">
              <!-- card 1 -->
              <div
                  class="w-full p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
              >
                <span class="bg-[#2a7cef] px-4 py-0.5 rounded-full !text-[#fff]">Шаг 1</span>
                <h2 class="mb-4 mt-3 text-xl font-bold text-gray-900 dark:text-white">
                  Настройки статуса и событий
                </h2>
                <LabelPopOver popover="Необходимо выбрать этап amoCRM. При переходе сделки на данный этап, будет создано событие в Google Календарь"
                              label="Статус"/>
                <p class="!text-red-700 pb-1.5" v-if="isShowLimitTextForStatus">
                  На тарифе <span class="font-bold !text-red-700">Start</span> можно создавать события только при переходе на один этап.<br>
                  Создание событий на нескольких этапах доступно на тарифах <span class="font-bold !text-red-700">Standard</span>  и <span class="font-bold !text-red-700">Enterprise</span>.
                </p>
                <template v-for="(st,key) in settings.status_ids" :key="key">
                  <div :class="{'mt-2':key>0}">
                    <div class="flex flex-auto items-end" >
                      <div class="flex gap-2 justify-between items-end w-full">
                        <MultilevelSelect
                            name="settings_status_id"
                            :settings_body="{
                              selected: {
                                child_id: st,
                              },
                              options: statuses,
                              option: {
                                key: 'id',
                                value: 'name',
                                nested: 'options',
                              },
                              nested: {
                                key: 'id',
                                value: 'name',
                              },
                            }"
                            :pix=key
                            @update:value="handleStatus"
                        />
                      </div>
                      <button v-if="key>0"
                          type="button" @click="deleteStatus(key)"
                          class="bg-[#fff] h-[39px] border border-solid flex items-center ml-3 text-[#ff6e6e] hover:text-white hover:bg-[#f45050] focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
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
                    </div>
                  </div>
                </template>
                <div>
                  <div class="w-full h-[42px]" >
                    <button
                        :class="{'disabled opacity-40 cursor-not-allowed':!(subscription?.save_statuses_count&&subscription?.save_statuses_count-1>=settings.status_ids.length)}"
                        @click="!(subscription?.save_statuses_count&&subscription?.save_statuses_count-1>=settings.status_ids.length)?showLimitText():addStatus()"
                        type="button"
                        class="dct-button bg-[#2a7cef] text-white mt-4 float-right flex justify-center items-center focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                      >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                      Добавить
                    </button>
                  </div>
                </div>

                <Select
                    label="События"
                    :options="selects"
                    popover="Дополнительный параметр для создания события в Google Календарь.
Здесь можно выбрать услугу которую вы оказываете и при переходе в этап, если поле будет заполнено и будет выбран этот параметр, событие будет создано именно в этом календаре. "
                    optionKey="name"
                    :selected="settings.fields_parent_id"
                    selected-key="id"
                    name="settings_parent_service_id"
                    @update:value="handleServiceParentId"
                >
                  <template #popover>
                    <p>
                      Дополнительный параметр для создания события в Google
                      Календарь. Здесь можно выбрать услугу которую вы оказываете
                      и при переходе в этап, если поле будет заполнено и будет
                      выбран этот параметр, событие будет создано именно в этом
                      календаре.
                    </p>
                    <p class="pt-4">
                      Если все сотрудники пользуются одним календарем, чтобы не
                      было путаницы необходимо сделать сопоставление поля
                      (например имя сотрудника) и внутреннего календаря. В таком
                      случае можно будет быстро просмотреть все занятые слоты,
                      либо просмотреть только одного сотрудника или услугу.
                    </p>
                  </template>
                </Select>
                <div class="w-full" v-if="settings?.fields?.length > 0">
                  <ul class="p-0 space-y-1 text-gray-500 list-none mt-2 max-h-[300px] overflow-y-auto dct-custom-scroll">
                    <template
                        v-for="(field, index) in settings.fields"
                        :key="index"
                    >
                      <li class="flex flex-auto items-end" :data-key="field.id">
                        <div class="flex gap-2 justify-between items-end w-full">
                          <Select
                              :options="services"
                              optionKey="service_value"
                              :selected="field.custom_field_id"
                              selected-key="service_id"
                              name="service_id"
                              @update:value="handleService($event, index)"
                          />
                          <Select
                              :options="calendars"
                              optionKey="summary"
                              :selected="field.calendar_id"
                              selected-key="id"
                              name="calendar_id"
                              @update:value="handleCalendar($event, index)"
                          />
                        </div>
                        <button
                            type="button"
                            @click="deleteItem(index, field.custom_field_id)"
                            data-modal-target="delete-modal"
                            data-modal-toggle="delete-modal"
                            class="bg-[#fff] border border-solid flex items-center ml-3 text-[#ff6e6e] hover:text-white hover:bg-[#f45050] focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
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
                      </li>
                    </template>
                  </ul>
                </div>
                <div class="w-full" v-if="settings?.fields?.length > 0">
                  <button
                      :disabled="!canAddNewItem"
                      @click="addService"
                      type="button"
                      class="dct-button mt-4 float-right flex justify-center items-center focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      :class="{
                    'bg-[#2a7cef] hover:bg-[#5c8bf9]': canAddNewItem,
                    'bg-blue-400 dct-cursor-not-allowed': !canAddNewItem,
                  }"
                  >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                    >
                      <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                    Добавить
                  </button>
                </div>
              </div>
              <!-- card 2 -->
              <div
                class="w-full !pb-[64px] !mb-[64px] bg-white p-4 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
            >
                <span class="bg-[#2a7cef] px-4 py-0.5 rounded-full !text-[#fff]">Шаг 2</span>
                <h2
                  class="mb-4 mt-3 text-xl font-bold text-gray-900 dark:text-white flex"
              >
                Настройки дата и время
                <Popover>
                  <template #title>
                    <h3 style="font-weight: 800">Настройки дата и время</h3>
                  </template>
                  <template #context>
                    <ul>
                      <li class="pt-4">
                        <b style="font-weight: 800">Вариант 1.</b> Вы вручную
                        для каждой сделки определяете дату и время начала и
                        завершения события, посредством заполнения полей amoCRM.
                        Например: 20.06.2023 15:00 - 20.06.2023 17:30
                      </li>
                      <li class="pt-4">
                        <b style="font-weight: 800">Вариант 2.</b> Вы назначаете
                        дату и время начала события, а продолжительность уже
                        будет фиксирована для всех событий. Например: Начало
                        события 20.06.2023 15:00, а длительность всех событий
                        будет по умолчанию 1 час."
                      </li>
                    </ul>
                  </template>
                </Popover>
              </h2>
              <div class="">
                <Toggle v-model="usePicker" class="ml-0" />
                <div class="flex gap-2 justify-between items-end">
                  <Select
                      :disabled="useInput"
                      label="Начало события (дата и время)"
                      :options="fields"
                      :selected="settings.starts_at_id"
                      optionKey="name"
                      selected-key="id"
                      name="start_date_id"
                      @update:value="handleStartDate"
                  />
                  <Select
                      :disabled="useInput"
                      label="Завершение события (дата и время)"
                      :options="fields"
                      option-key="name"
                      :selected="settings.ends_at_id"
                      selected-key="id"
                      name="end_date_id"
                      @update:value="handleEndDate"
                  />
                </div>
              </div>
              <div class="">
                <Toggle v-model="useInput" />
                <div class="flex gap-2 justify-between items-end">
                  <div class="w-1/2">
                    <Select
                        label="Начало события (дата и время)"
                        :disabled="usePicker"
                        :options="fields"
                        :selected="settings.starts_at_id"
                        optionKey="name"
                        selected-key="id"
                        name="start_date_id"
                        @update:value="handleStartDate"
                    />
                  </div>
                  <div class="flex flex-col w-1/2">
                    <label
                        class="dct-label -mb-1.5 text-sm mt-4 mb-2 text-gray-900 dark:text-white"
                    >Укажите длительность</label
                    >
                    <div class="flex justify-start items-center gap-2">
                      <div class="flex justify-start items-end gap-2 dct-time-picker">
                          <a-time-picker v-model:value="time" @change="pickTime(time)" :minute-step="5" placement="topLeft" format="HH:mm" :class="usePicker?'opacity-40 pointer-event-none':''" popup-class-name="dct-time-picker-pop-up" class="p-2 min-h-[39.5px] dct-select-v2 text-sm rounded-lg border"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <!-- card 3 -->
            <div
              class="w-[55%] !pb-[64px] mb-[64px]  border bg-white p-4 border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700"
            >
              <span class="bg-[#2a7cef] px-4 py-0.5 rounded-full !text-[#fff]">Шаг 3</span>
              <h2 class="mb-4 mt-3 text-xl font-bold text-gray-900 dark:text-white">
                Настройки Контента
              </h2>

              <Select
                popover="Выбираете поле в amoCRM, которое будет отображать название события в Google Календаре. Можете выбрать название сделки, для того чтобы событие и сделка назывались одинаково"
                class=""
                label="Название события в календаре"
                :options="fields"
                option-key="name"
                :selected="settings.event_name_id"
                selected-key="id"
                name="event_name_id"
                @update:value="handleTaskName"
              >
                <template #popover>
                  <p>
                    Выбираете поле в amoCRM, которое будет отображать название
                    события в Google Календаре. Можете выбрать название сделки,
                    для того чтобы событие и сделка назывались одинаково
                  </p>
                </template>
              </Select>
              <Select
                popover="Выбираете поле в amoCRM, где вы прописываете адрес и после создания события в Google Календаре, можно будет посмотреть адрес отдельно и даже открыть его на Google Maps"
                label="Местоположение / Адрес"
                :options="fields"
                optionKey="name"
                :selected="settings.event_location_id"
                selectedKey="id"
                name="address"
                @update:value="handleAddress"
                placeholder="Город Москва, Ул 45 дом 14"
              >
                <template #popover>
                  <p>
                    Выбираете поле в amoCRM, где вы прописываете адрес и после
                    создания события в Google Календаре, можно будет посмотреть
                    адрес отдельно и даже открыть его на Google Maps
                  </p>
                </template>
              </Select>
              <div class="relative">
                <div class="flex mt-4 ">
                  <label
                    for="description"
                    class="dct-label block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Описание события
                  </label>
                  <Popover>
                    <template #title>
                      <h3 style="font-weight: 800">Описание события</h3>
                    </template>
                    <template #context>
                      Это развернутое описание события в Google Календаре,<br />
                      которое позволит передать любую необходимую информацию из
                      полей amoCRM используя текст и переменные (все переменные
                      доступны по кнопке “Открыть Шаблонизатор”
                    </template>
                  </Popover>
                </div>
                <Shablon :account="account"/>
              </div>
            </div>
          </div>
          <div
            v-if="showTabs['calendar']"
            class=" pb-[120px] w-full p-4 rounded-md"
            style="margin-left: 0px !important; background: #ffffff !important"
          >
            <CalendarSettings />
          </div>
          <div v-if="showTabs['additional']">
            <AdditionalSettings/>
          </div>
        </div>
      </div>
      <div
        v-if="calendarSettingsStore.loader"
        class="absolute w-full h-full top-0 left-0 bg-[#f5f5f5f5] flex justify-center items-center pointer-events-none"
        style="z-index: 99999999999999999"
      >
        <div role="status">
          <svg
            aria-hidden="true"
            class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#2a7cef]"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Drawer } from "flowbite";
import Select from "./inputs/Select.vue";
import MultilevelSelect from "./inputs/MultilevelSelect.vue";
import { useSettingsStore } from "../stores/settings";
import { useSelectStore } from "../stores/select";
import { onMounted, ref, watch } from "vue";
import Toggle from "./inputs/Toggle.vue";
import Input from "./inputs/Input.vue";
import ShablonItem from "./ShablonItem.vue";
import Popover from "./Popover.vue";
import { storeToRefs } from "pinia";
import CalendarSettings from "./CalendarSettings.vue";
import { useCalendarSettingsStore } from "../stores/calendar_settings";
import { notify } from "@kyvg/vue3-notification";
import {get} from "axios";
import Shablon from "./Shablon.vue";
import LabelPopOver from "./inputs/LabelPopOver.vue";
import AdditionalSettings from "./AdditionalSettings.vue";
import {useCalendarSubdomainStore} from "../stores/calendar_subdomain";
import dayjs from 'dayjs';
const time = ref(dayjs('00:00', 'HH:mm'));
const settingsStore = useSettingsStore();
const selectStore = useSelectStore();
const isShowLimitTextForStatus=ref(false)
const { settings } = storeToRefs(settingsStore);
const { fields, statuses, selects, markers } =
  storeToRefs(selectStore);
const calendarSettingsStore = useCalendarSettingsStore();
const {calendars}=storeToRefs(calendarSettingsStore);
const calendarSubdomainStore = useCalendarSubdomainStore();
const {subscription}=storeToRefs(calendarSubdomainStore);
const props = defineProps({
  account: [Number, null],
  subdomainId: Number,
});
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
const locale = ref('zhCN'); // Change to your desired locale

function pickTime(value){
  if(value){
    value.format('HH:mm')
    settings.value.duration={
      hours: value.$H,
      minutes: value.$m,
    }
  }else{
    settings.value.duration=null
  }
}

function showLimitText(){
  isShowLimitTextForStatus.value=true
}

const showTabs=ref({
  main:true,
  calendar:false,
  additional:false
})

const emit = defineEmits(["close-drawer"]);
// logic
const useInput = ref(!!settings.value.duration);
const usePicker = ref(!settings.value.duration);

const canAddNewItem = ref(true);
const services = ref(null);

function addStatus(){
  settings.value.status_ids.push(0)
}

function deleteStatus(key) {
  settings.value.status_ids.splice(key, 1);
  isShowLimitTextForStatus.value=false
}

function changeTab(key) {
  Object.keys(showTabs.value).forEach(k => {
    showTabs.value[k] = false;
  });

  showTabs.value[key] = true

}

function handleAddress(value) {
  settings.value.event_location_id = value;
}

function handleTaskName(value) {
  settings.value.event_name_id = value;
}

function handleStartDate(value) {
  settings.value.starts_at_id = value;
}

function handleEndDate(value) {
  settings.value.ends_at_id = value;
}


async function handleServiceParentId(parentId) {
  settings.value.fields = [];
  settings.value.fields_parent_id = parentId;
  services.value = getServices(parentId);
  selectStore.calendars=[]
  await selectStore.getCalendars(
      props.account
  )
  settings.value.fields = [{
    "custom_field_id": null,
    "calendar_id": null
  }];

}

function getServices(parentId) {
  let element=selects.value.find((select) => select.id === parentId)
  if (!element) { return [];}
  return element.options.map((option) => {
      return {
        service_id: option.id,
        service_value: option.value,
      };
    });
}

function handleService(custom_field_id, index) {

  // const service = services.value.find((item) => item.custom_field_id === serviceId);
  settings.value.fields[index].custom_field_id =custom_field_id;
  // settings.value.fields[index].service_value = service.service_value;
  // settings.value.fields[index].order = index;
  //   servicesToDeleteFromSelect.value.push(serviceId);
  //   services.value = services.value.filter((service) => service.id !== serviceId);
}

function handleCalendar(calendar_id, index) {
  settings.value.fields[index].calendar_id = calendar_id;
}

function handleStatus(option,key) {
  settings.value.status_ids[key] = option.child;
}

async function handleSave() {
  try {
    calendarSettingsStore.loader = true;
    await settingsStore.saveSettings(props.account);
    await calendarSettingsStore.saveCalendar(props.account);
    calendarSettingsStore.loader = false;
    closeModal()
  } catch (error) {
    calendarSettingsStore.loader = false;
    notify({
      type: "error",
      title: "Пользователь #" + props.account,
      text: "Заполните все поля или попробуйте авторизоваться еще раз",
    });
  }
}

function addService() {
  settings.value.fields.push({});
  checkCanAddNewItem();
}

function checkCanAddNewItem() {
  if (services.value?.length <= settings.value?.fields?.length) {
    canAddNewItem.value = false;
  } else {
    canAddNewItem.value = true;
  }
}

async function deleteItem(index, id) {
  settings.value.fields.splice(index, 1);
  let temp=settings.value.fields
  settings.value.fields=[]
  setTimeout(()=>{
    settings.value.fields=temp
  },100)
  checkCanAddNewItem();
}



function closeModal() {
  if(document.getElementById("drawer-example")){
    document.getElementById("drawer-example").classList.add("hidden");
    emit("close-drawer");
  }

}

watch(useInput, (newValue) => {
  settings.value.duration = null;
  time.value=dayjs('00:00','HH:mm');
  usePicker.value = !newValue;
});

watch(usePicker, (newValue) => {
  settings.value.duration = null;
  time.value=dayjs('00:00','HH:mm');

  useInput.value = !newValue;
});


onMounted(async () => {
  usePicker.value = !settings.value.duration;
  useInput.value = !!settings.value.duration;
  if(settings.value.duration){
    time.value=dayjs(settings.value.duration.hours+':'+settings.value.duration.minutes,'HH:mm');
  }
  if(settings.value.status_ids.length===0){
    handleStatus(0,0)
  }
  document.getElementById("drawer-example").classList.remove("hidden");
  services.value = [];

  if (settings.value.fields_parent_id) {
    services.value = getServices(settings.value.fields_parent_id);
  }
  await calendarSettingsStore.getCalendars(
    props.account
  );

  const timePicker = document.querySelector('.dct-time-picker .ant-picker-input input');
  if (timePicker) {
    timePicker.placeholder = "";
  }
  const okButton = document.querySelector('.dct-time-picker-pop-up .ant-picker-ok button span');
  if (okButton) {
    okButton.textContent = "ОК"; // Change "Ok" to "Confirm"
  }

});
</script>

<style>
.dct-time-picker-pop-up .ant-picker-now{
  display: none !important;
}

.dct-time-picker-pop-up{
  width: 170px;
}

.dct-time-picker-pop-up .ant-picker-panel{
  width: 100% !important;
}

.dct-time-picker-pop-up .ant-picker-time-panel-column::after{
  height: 0!important;
}

.dct-time-picker-pop-up .ant-picker-ok{
  width: 100% !important;
}

.dct-time-picker-pop-up .ant-picker-ok button{
  width: 100% !important;
}
</style>
