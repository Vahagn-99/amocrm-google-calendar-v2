<template>
  <div class="flex flex-col gap-6 w-[45%] bg-[#f5f5f5]">
    <div
        class="w-full p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
    >
      <h2 class="mb-4 mt-3 text-xl font-bold text-gray-900 dark:text-white">
        Настройки статуса для удаления
      </h2>
      <p class="!text-red-700 pb-1.5" v-if="subscription?.delete_statuses_count===0">На тарифе <span class="font-bold !text-red-700">Start</span> функция удаления событий в Google Календаре недоступна.</p>
      <p class="!text-red-700 pb-1.5" v-if="isShowLimitTextForStatus">Вы достигли лимита по тарифу.</p>
      <LabelPopOver popover="Необходимо выбрать этап amoCRM. При переходе сделки на данный этап, будет удаляться созданное  событие в Google Календаре"
                    label="Статус" :is-disabled="subscription?.delete_statuses_count===0"/>
      <template v-for="(st,key) in settings.delete_status_ids" :key="key">
        <div :class="{'mt-2':key>0}">
          <div class="flex flex-auto items-end" >
            <div class="flex gap-2 justify-between items-end w-full">
              <MultilevelSelect
                  name="settings_status_id"
                  :is-disabled="subscription?.delete_statuses_count===0"
                  :settings_body="{
                  selected: {
                    child_id: st,
                  },
                  options: statuses,
                  option: {
                    key: 'id',
                    value: 'name',
                    nested: 'options'
                  },
                  nested: {
                    key: 'id',
                    value: 'name'
                  }
                }"
                  :pix="key"
                  @update:value="handleStatus"
              />
            </div>
            <button v-if="key>0"
                    type="button" @click="deleteStatus"
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
              v-if="subscription?.delete_statuses_count!==0"
              :class="{'disabled opacity-40 cursor-not-allowed':!(subscription?.delete_statuses_count&&subscription?.delete_statuses_count-1>=settings.delete_status_ids.length)}"
              @click="!(subscription?.delete_statuses_count&&subscription?.delete_statuses_count-1>=settings.delete_status_ids.length)?showLimitText():addStatus()"
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
    </div>
  </div>

</template>

<script setup>
  import MultilevelSelect from "./inputs/MultilevelSelect.vue";
  import LabelPopOver from "./inputs/LabelPopOver.vue";
  import {onMounted, ref} from "vue";
  import {storeToRefs} from "pinia";
  import {useSettingsStore} from "../stores/settings";
  import {useSelectStore} from "../stores/select";
  import {useCalendarSubdomainStore} from "../stores/calendar_subdomain";
  const selectStore = useSelectStore();
  const { statuses }=storeToRefs(selectStore);
  const isShowLimitTextForStatus=ref(false)
  const calendarSubdomainStore = useCalendarSubdomainStore();
  const {subscription}=storeToRefs(calendarSubdomainStore);
  const settingsStore = useSettingsStore();
  const { settings } = storeToRefs(settingsStore);

  function showLimitText(){
  isShowLimitTextForStatus.value=true
}

  function addStatus(){
    settings.value.delete_status_ids.push(0)
}


  function deleteStatus(key) {
    settings.value.delete_status_ids.splice(key, 1);
    isShowLimitTextForStatus.value=false
  }

  function handleStatus(option,key) {
    settings.value.delete_status_ids[key] = option.child;
  }

  onMounted(()=>{
  if(settings.value.delete_status_ids.length===0){
  handleStatus(0,0)
}
})

</script>