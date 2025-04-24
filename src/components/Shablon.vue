<template>
  <p class="!text-red-700 pb-1.5" v-if="count===limit">
    Вы достигли лимита по тарифу <span class="font-bold !text-red-700">Start</span><br>
    Для увеличения лимитов обратитесь в техническую поддержку виджета</p>
  <div class="flex gap-4">
    <div class="relative w-full">
       <textarea
           id="description"
           rows="8"
           class="dct-textarea-v2 min-h-[408px] block p-2.5 pr-[55px] w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
           placeholder="Вставьте сюда..."
           v-model="settings.template"
           @input="countDoubleBrackets()"
       ></textarea>
      <span class="absolute top-2.5 right-2.5 bg-[#f5f5f5]" :class="{'!text-red-700':count>=limit}">{{count}} / {{limit==5000?'Без лимит':limit}}</span>
    </div>
    <div class="w-[280px]" :class="{'disabled cursor-not-allowed pointer-event-none opacity-40':count>=limit}">
      <template
          v-for="(marker, key) in selectStore.markers"
          :key="key"
      >
        <div>
          <div class="flex justify-between items-center h-[36px] cursor-pointer" @click="toggle(key)">
            <h2 class="text-[14px] font-bold">{{tabs[key].name}}</h2>
            <p>
              <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 10L12 15L17 10" stroke="#343434" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </p>
          </div>
          <ul v-if="tabs[key].isShow" class="h-[300px] overflow-y-auto dct-custom-scroll flex flex-col gap-2">
            <li v-for="(item, k) in marker" @click="copyMarker(key,item)" class="text-[12px]  bg-[#f5f5f5] cursor-pointer rounded-md p-2">
              {{item.name}}
            </li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import {useSelectStore} from "../stores/select";
import {useSettingsStore} from "../stores/settings";
import {nextTick, onMounted, ref, watch} from "vue";
import {storeToRefs} from "pinia";
import {useCalendarSubdomainStore} from "../stores/calendar_subdomain";
const editableDiv=ref(null)
const settingsStore = useSettingsStore();
const {settings}=storeToRefs(settingsStore)
const selectStore=useSelectStore()
const {idToView}=storeToRefs(selectStore)

const calendarSubdomainStore=useCalendarSubdomainStore()
const {client}=storeToRefs(calendarSubdomainStore)
const limit=ref(client.value?.last_subscription?.subscription_plan?.features.masks_count)
const tabs=ref({
  leads:{
    name:'Сделки',
    isShow:true
  },
  contacts:{
    name:'Контакты',
    isShow:false
  },
  companies:{
    name:'Компании',
    isShow:false
  }
})

function toggle(key) {
  Object.keys(tabs.value).forEach(k => {
    if(k===key){
      tabs.value[key].isShow = !tabs.value[key].isShow
    }else{
      tabs.value[k].isShow = false;
    }
  });
}

function copyMarker(key,item) {
  if(count.value<limit.value){
    settings.value.template =
        settings.value.template === null
            ? ""
            : settings.value.template +' '+item.view +' ';

  }

  countDoubleBrackets()
}

const count=ref(0)
function countDoubleBrackets() {
  count.value = (settings.value.template.match(/\]\]/g) || []).length;
}

function replaceIdWithView(text){
   return text.replace(/\{\{.*?\}\}/g, match => idToView.value[match] || match);
}


onMounted(()=>{
  selectStore.buildMappings()

  settings.value.template =replaceIdWithView(settings.value.template)
  countDoubleBrackets()
})
</script>

