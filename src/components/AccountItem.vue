<template>
    <div v-if="!changeName" class="flex items-center justify-start mr-3 gap-2">
      {{ account.name }}
      <svg @click="openInput" xmlns="http://www.w3.org/2000/svg" class="cursor-pointer w-[18px]"
           viewBox="0 0 20 20"
           fill="#2a7cef" aria-hidden="true">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
        <path fill-rule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clip-rule="evenodd"></path>
      </svg>
    </div>
    <div v-if="changeName" class="flex items-center justify-start mr-3 gap-2">
      <input v-model="account.name" ref="inputRef" class="border-b border-solid border-[#2a7cef] w-[210px]">
      <svg @click="closeInput"
           viewBox="0 0 24 24" class="w-[18px] cursor-pointer" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M18.1716 1C18.702 1 19.2107 1.21071 19.5858 1.58579L22.4142 4.41421C22.7893 4.78929 23 5.29799 23 5.82843V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H18.1716ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21L5 21L5 15C5 13.3431 6.34315 12 8 12L16 12C17.6569 12 19 13.3431 19 15V21H20C20.5523 21 21 20.5523 21 20V6.82843C21 6.29799 20.7893 5.78929 20.4142 5.41421L18.5858 3.58579C18.2107 3.21071 17.702 3 17.1716 3H17V5C17 6.65685 15.6569 8 14 8H10C8.34315 8 7 6.65685 7 5V3H4ZM17 21V15C17 14.4477 16.5523 14 16 14L8 14C7.44772 14 7 14.4477 7 15L7 21L17 21ZM9 3H15V5C15 5.55228 14.5523 6 14 6H10C9.44772 6 9 5.55228 9 5V3Z"
                fill="#2a7cef"></path>
        </g>
      </svg>
    </div>
</template>
<script setup>
import {onMounted, ref} from "vue";
import {useAccountStore} from "../stores/account";

const accountStore=useAccountStore()
const inputRef=ref(null)
const props = defineProps({
  account: Object,
  gKey:Number
});
const changeName=ref(false)

function openInput() {
  changeName.value = true
  if(inputRef.value){
    inputRef.value.focus()
  }
}

async function closeInput() {

  await accountStore.saveAccount(props.account)
  changeName.value = false
}
onMounted(()=>{
  props.account.name=props.account.name ?? 'Календарь '+ props.gKey+1
})

</script>