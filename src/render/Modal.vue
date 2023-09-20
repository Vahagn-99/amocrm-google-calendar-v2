<template>
  <div
      class="modal dct_leads_exchange_modal hidden"
      id="dct_leads_exchange_modal"
  >
    <div class="modal-scroller custom-scroll" >
      <div class="modal-body modal-body-relative bg-[#f5f5f5] block dct-drawer-fixed z-40 p-4 overflow-y-auto w-[30%] right-0 top-0 m-0 h-full"
           :class="lock?'dct-lead-exchange-modal-lock':''"
      >
        <div class="modal-body__inner">
          <div class="add-group">
            <div class="add-group__header">
              <div class="dct-pipeline_cell-head ">
                <div class="pipeline_status__head-wrapper">
                  <div class="dct-pipeline_status__head">
                    <div class="pipeline_status__head_title" title="Сделки без задач">
                      <h2 class="block-selectable dct-title-without-task">
                        Биржа лидов ( {{currentLeads.length}}/{{settingsStore.settings.count}} )
                      </h2>
                    </div>
                    <div class="pipeline_status__head_info js-fixed-header-stats" style="opacity: 1; max-height: 20px;">
                    </div>
                    <span class="dct-pipeline_status__head_line" style="background: #dd7b36; color: #f3beff;"></span>
                  </div>
                </div>
              </div>
              <span class="modal-body__close" @click="closeModal">
                <span class="icon icon-modal-close"></span>
              </span>
            </div>
            <div class="add-group__item dct-add-group__item">
              <ul class="dct-leads-exchange-list" :class="lock?'dct-lock-modal':''">
                <template v-for="(lead, key) in leads ?? []" :key="key">
                  <li class="bg-white border-[#c5c5c5]">
                    <div class="flex items-center justify-between li-elem">
                      <div>
                        <p class="fs-[16px] font-semibold">{{lead.name}}</p>
                        <small class="fs-[12px]">Этап: {{filterByStatusId(lead.status_id ,lead.pipeline_id)}}</small>
                      </div>
                      <button class="button-input button-input_blue js-navigate-link">
                        <a href="#" @click="changeResponsibleUserAndChangePage(lead.id)" class="pipeline_leads__title-text h-text-overflow js-navigate-link">
                          <span class="button-input-inner__text">Принять</span>
                        </a>
                      </button>
                    </div>
                  </li>
                </template>
              </ul>
              <template v-if="lock">
                <div class="dct-lead-exchange-lock-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="80px" height="80px" viewBox="0 0 24 24" fill="none" stroke="#ff0000" class="__web-inspector-hide-shortcut__">

                    <g id="SVGRepo_bgCarrier" stroke-width="0"/>

                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

                    <g id="SVGRepo_iconCarrier"> <path d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288" stroke="#f21c1c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g>

                  </svg>
                  <p>У вас много сделок</p>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
        class="default-overlay modal-overlay modal-overlay--filled default-overlay-visible"
    >
      <span
          class="modal-overlay__spinner spinner-icon spinner-icon-abs-center hidden"
      ></span>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from "pinia";
import {useModalStore} from "../stores/modal";
import {useSelectStore} from "../stores/select";
import {onMounted, ref} from "vue";
import {useSettingsStore} from "../stores/settings";

const modalStore = useModalStore();
const { leads ,currentLeads} = storeToRefs(modalStore);

const settingsStore = useSettingsStore();
const { settings } = storeToRefs(settingsStore);
const lock=ref(currentLeads.value.length>=settings.value.count)
const selectStore = useSelectStore();


function closeModal() {
  document.getElementById("dct_leads_exchange_modal").classList.add("hidden");
}

function filterByStatusId(status_id,pipeline_id){

  let foundName = 'Status'; // Default value if no match is found

  selectStore.statuses.forEach(statusObj => {
    let elem = statusObj.options.find(item => item.id === status_id && statusObj.id === pipeline_id);
    if (elem) {
      foundName = elem.name;
    }
  });

  return foundName;
}

async function changeResponsibleUserAndChangePage(lead_id) {
  await modalStore.changeResponsibleUser(lead_id);
  window.location.href = generateLink(lead_id);

}
function generateLink(lead_id){
  return '/leads/detail/' +lead_id
}

onMounted(()=>{
  if (modalStore.currentLeads.length >= settingsStore.settings.count) {
    console.log(document.querySelector('.list__top__actions .button-input_add-lead')
    )
    document.querySelector('.pipeline_leads__quick_add_button ').classList.add('opacity-20','pointer-events-none')
    document.querySelector('.list__top__actions .button-input_add-lead').classList.add('opacity-40')
    document.querySelector('.list__top__actions .button-input_add-lead').href=window.location.pathname+window.location.search

    document.querySelector('.list__top__actions .button-input_add-lead').addEventListener('click',function(e){
      e.preventDefault()
      document.getElementById("dct_leads_exchange_modal").classList.remove("hidden");

    })
  }
})

</script>
