<template>
  <div class="dct-block border-t mt-2">
    <div class="my-4 relative">
      <div class="flex">
        <label
            for="description"
            class="dct-label block mb-1 text-sm  text-gray-900 dark:text-white"
        >
          Пользователи , имеющие доступ к календарю (e-mail)
        </label>
      </div>
      <div
          @click="addFocus($event)"
          class="dct-shablon-element dct-textarea-v2 p-1 rounded-lg min-h-[85px]"
      >
        <template
            v-for="(email, key) in emails ?? []"
            :key="key"
        >
              <span
                  :id="'dct-elem-status-'+email.id"
                  class="inline-flex items-center px-2 py-1 m-1 text-sm font-medium text-blue-800 bg-[#fff] rounded"
              >
                {{ email.value }}
                <button
                    @click="deleteAccount(key)"
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
                </button>
              </span>
        </template>
        <span class=" py-1 m-1.5 text-sm font-medium inline-block min-w-[200px]">
          <input type="text" ref="inputRef" class="min-w-[200px] bg-[#f5f5f5]">
        </span>
      </div>
    </div>
  </div>

</template>
<script setup>
import {onMounted, ref} from "vue";
import {useCalendarSettingsStore} from "../stores/calendar_settings";

const inputRef=ref(null)
const calendarSettingsStore=useCalendarSettingsStore()
const props = defineProps({
  emails: Array,
  gKey:Number,
});




function addFocus(event) {
  if(event.target.classList.contains('dct-shablon-element')){
    inputRef.value.focus()
  }
}


function deleteAccount(acc_key) {
  calendarSettingsStore.calendars[props.gKey].acl_list.splice(acc_key, 1)
}

function addAccount(value) {
  calendarSettingsStore.calendars[props.gKey].acl_list.push({
    id:'',
    value:value
  })
}

onMounted(()=>{
  if(inputRef.value){
    inputRef.value.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' || event.keyCode === 13 || event.key === ',' || event.keyCode === '186') {
        addAccount(inputRef.value.value)
        inputRef.value.value=''
      }
    });
    inputRef.value.addEventListener('paste', function(event) {
      setTimeout(()=>{
        addAccount(inputRef.value.value)
        inputRef.value.value=''
      },200)
    });
    }

  const targetElement = document.querySelector('.dct-shablon-element');

  // Function to handle the click event
  function handleClickOutside(event) {
    // Check if the clicked element is not the target element or its descendants
    if (inputRef.value && !targetElement.contains(event.target) && inputRef.value.value!=='') {
      addAccount(inputRef.value.value)
      inputRef.value.value=''
    }
  }

  // Add a click event listener to the document
  document.addEventListener('click', handleClickOutside);
})


</script>