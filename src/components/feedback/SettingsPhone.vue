<template>
  <div
    class="dct-activate__wrapper h-full rounded-lg box-border bg-[#e3edf6]"
    :class="classObj"
  >
    <div v-if="loading" class="flex items-center">
      <div role="status">
        <svg
          aria-hidden="true"
          class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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

    <div class="dct-activate__body" v-else>
      <div class="dct-activate__info-wrapper">
        <div class="dct-activate__info-body flex start items-center">
          <div class="dct-activate__icon">
            <svg
              v-if="hasPhone"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-[3rem] h-[3rem] mx-2 text-green-500"
            >
              <path
                fill-rule="evenodd"
                d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              v-if="!hasPhone"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-[3rem] h-[3rem] mx-2 text-red-500"
            >
              <path
                fill-rule="evenodd"
                d="M6.72 5.66l11.62 11.62A8.25 8.25 0 006.72 5.66zm10.56 12.68L5.66 6.72a8.25 8.25 0 0011.62 11.62zM5.105 5.106c3.807-3.808 9.98-3.808 13.788 0 3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div>
            <div class="dct-activate__title text-[15px] text-[#343434]">
              Статус клиента
              <span class="text-[#00ad71]" v-if="hasPhone">
                : Телефон подтвержден</span
              >
            </div>
            <div class="dct-activate__description text-[15px] text-black">
              Подтвердите телефон и получите виджет в подарок
            </div>
          </div>
        </div>
      </div>
      <div
        class="dct-activate__controls-wrapper"
        style="pointer-events: all; opacity: 1"
      >
        <div class="flex items-center justify-start gap-2 my-[18px]">
          <input name="dct-phone__activation" v-model="currentCountryCode"
                 class="dct-input-v2 dct-input border text-sm h-[38px] pl-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                 placeholder="Номер телефона"/>

          <button
              @click="handlePhone"
              type="button"
              class="button-input !h-[38px] min-w-[170px] rounded-lg"
              :class="{ 'button-input-disabled': !userAgreed }"
              id="dct-activation-button"
          >
                <span class="button-input-inner"
                ><span class="button-input-inner__text"
                >Подтвердить</span
                ></span
                >
          </button>
        </div>

          <div class="dct-activate__politics mt-3 flex items-start justify-start gap-1">
            <label class="control-checkbox control-checkbox_small mr-[4px] mt-[2px]">
              <div class="control-checkbox__body">
                <input
                  type="checkbox"
                  name="dct-politics"
                  v-model="userAgreed"
                />
                <span class="control-checkbox__helper"></span>
              </div>
            </label>
            <span class="dct-activate__policits-text">
              Я ознакомлен с
              <a
                href="https://dicitech.com/license-agreement "
                target="_blank"
                class="dct-tab__activation_user_agreement_link"
                >пользовательским соглашением</a
              >
              и
              <a
                href="https://dicitech.com/work_info "
                target="_blank"
                class="dct-tab__activation_politics_link"
                >политикой конфиденциальности</a
              >
            </span>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import Input from "../inputs/Input.vue";
import { storeToRefs } from "pinia";
import {useCalendarSubdomainStore} from "../../stores/calendar_subdomain";

const subdomainStore = useCalendarSubdomainStore();

const { hasPhone, client } = storeToRefs(subdomainStore);

const props = defineProps({
  isMain: Boolean,
  loading: Boolean,
});

const classObj = computed(() => ({
  "flex items-center justify-center": props.loading,
}));

const userAgreed = ref(false);
const currentCountryCode = ref(null);

async function handlePhone() {
  const data = {
    phone: currentCountryCode.value
  };
  await subdomainStore.addPhone(data);
}

onMounted(async () => {
  await subdomainStore.getClientInfo();
  currentCountryCode.value = client.value?.phone ?? "+7";
});
</script>
