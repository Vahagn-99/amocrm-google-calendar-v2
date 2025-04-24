<template>
  <div class="bg-white" >
    <div class="p-4">
      <button @click="send" :class="{'pointer-events-none opacity-40':isLoading}" class="rounded-md bg-[#2a7cef] h-[36px] text-white w-full text-center py-2 ">Обновить событие</button>
      <p class="mt-2 text-[11px]"><sup>* </sup>Перед тем как обновить, убедитесь, что вы нажали кнопку «Сохранить» при изменении параметров сделки.</p>
      <div class="mt-8"><span class="font-bold">Лимит: </span>
        <span v-if="subscription?.transaction_daily_limit">{{client?.embedded?.used_tokens<=subscription?.transaction_daily_limit ? client?.embedded?.used_tokens : subscription.transaction_daily_limit}} / {{subscription.transaction_daily_limit}}</span>
        <span v-else>Без лимита</span>
      </div>
      <div class="mt-3 !text-red-700" v-if="transaction_daily_limit&&client?.embedded?.used_tokens>=subscription?.transaction_daily_limit">Вы достигли лимита по тарифу <span class="font-bold !text-red-700">Start</span>.
        Для увеличения лимитов обратитесь в техническую поддержку виджета.</div>
      <div class="mt-3"><span class="font-bold" > Авторизация: </span><span :class="isRegistred?'text-[#00af70]':'text-red-700'">{{isRegistred?'Активно':'Не активно'}}</span></div>
      <button v-if="!isRegistred" class="mt-3 rounded-md bg-[#2a7cef] h-[36px] text-white w-full text-center py-2" @click="handleAmoAuth">Авторизоваться</button>
    </div>
  </div>
</template>
<script setup>
import {useCalendarSubdomainStore} from "../stores/calendar_subdomain";
import {storeToRefs} from "pinia";
import {onMounted, ref} from "vue";
import {oauthModal} from "../helpers/helpers";
import {useLeadStore} from "../stores/leads";

const calendarSubdomainStore = useCalendarSubdomainStore();
const {subscription,client,isRegistred}=storeToRefs(calendarSubdomainStore);
const leadStore=useLeadStore()
async function handleAmoAuth() {
  await oauthModal(
      `${window.Host}clients/oauth`
  ).then(async (e) => {
    await calendarSubdomainStore.getClientInfo()
  });
}

const isLoading=ref(false);

async function send() {
  const id = window.APP.data.current_card.id
  isLoading.value = true
  await leadStore.sendLead(id)
  setTimeout(async () => {
    await calendarSubdomainStore.getClientInfo()
    isLoading.value = false
  },10000)
}

onMounted(async () => {
  await calendarSubdomainStore.getClientInfo()
});
</script>