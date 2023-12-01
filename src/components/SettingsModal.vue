<template>
  <div class="max-w-2xl p-4 mx-auto">
    <div
      id="drawer-example"
      class="dct-drawer dct-drawer-fixed z-40 h-screen p-0 overflow-y-auto bg-slate-50 w-[57%] dct-modal hidden"
      tabindex="-1"
      aria-labelledby="drawer-label"
      style="background: #fff"
    >
      <button
        @click="closeModal"
        id="drawer-hide-button"
        type="button"
        aria-controls="drawer-example"
        class="dct-button z-20 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
      <div class="flex items-start">
        <div
          class="pt-6 sticky top-0 px-[20px]"
          style="background: #fff !important"
        >
          <div
            @click="changeTab1"
            :class="!openTab ? 'dct-active-tab' : ''"
            class="dct-drawer-tab"
          >
            <p class="flex items-center gap-2.5">
              <svg
                viewBox="0 0 24 24"
                class="w-[28px] h-[28px]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 8.25C9.92894 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92894 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25ZM9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z"
                    fill="#878c9d"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.9747 1.25C11.5303 1.24999 11.1592 1.24999 10.8546 1.27077C10.5375 1.29241 10.238 1.33905 9.94761 1.45933C9.27379 1.73844 8.73843 2.27379 8.45932 2.94762C8.31402 3.29842 8.27467 3.66812 8.25964 4.06996C8.24756 4.39299 8.08454 4.66251 7.84395 4.80141C7.60337 4.94031 7.28845 4.94673 7.00266 4.79568C6.64714 4.60777 6.30729 4.45699 5.93083 4.40743C5.20773 4.31223 4.47642 4.50819 3.89779 4.95219C3.64843 5.14353 3.45827 5.3796 3.28099 5.6434C3.11068 5.89681 2.92517 6.21815 2.70294 6.60307L2.67769 6.64681C2.45545 7.03172 2.26993 7.35304 2.13562 7.62723C1.99581 7.91267 1.88644 8.19539 1.84541 8.50701C1.75021 9.23012 1.94617 9.96142 2.39016 10.5401C2.62128 10.8412 2.92173 11.0602 3.26217 11.2741C3.53595 11.4461 3.68788 11.7221 3.68786 12C3.68785 12.2778 3.53592 12.5538 3.26217 12.7258C2.92169 12.9397 2.62121 13.1587 2.39007 13.4599C1.94607 14.0385 1.75012 14.7698 1.84531 15.4929C1.88634 15.8045 1.99571 16.0873 2.13552 16.3727C2.26983 16.6469 2.45535 16.9682 2.67758 17.3531L2.70284 17.3969C2.92507 17.7818 3.11058 18.1031 3.28089 18.3565C3.45817 18.6203 3.64833 18.8564 3.89769 19.0477C4.47632 19.4917 5.20763 19.6877 5.93073 19.5925C6.30717 19.5429 6.647 19.3922 7.0025 19.2043C7.28833 19.0532 7.60329 19.0596 7.8439 19.1986C8.08452 19.3375 8.24756 19.607 8.25964 19.9301C8.27467 20.3319 8.31403 20.7016 8.45932 21.0524C8.73843 21.7262 9.27379 22.2616 9.94761 22.5407C10.238 22.661 10.5375 22.7076 10.8546 22.7292C11.1592 22.75 11.5303 22.75 11.9747 22.75H12.0252C12.4697 22.75 12.8407 22.75 13.1454 22.7292C13.4625 22.7076 13.762 22.661 14.0524 22.5407C14.7262 22.2616 15.2616 21.7262 15.5407 21.0524C15.686 20.7016 15.7253 20.3319 15.7403 19.93C15.7524 19.607 15.9154 19.3375 16.156 19.1985C16.3966 19.0596 16.7116 19.0532 16.9974 19.2042C17.3529 19.3921 17.6927 19.5429 18.0692 19.5924C18.7923 19.6876 19.5236 19.4917 20.1022 19.0477C20.3516 18.8563 20.5417 18.6203 20.719 18.3565C20.8893 18.1031 21.0748 17.7818 21.297 17.3969L21.3223 17.3531C21.5445 16.9682 21.7301 16.6468 21.8644 16.3726C22.0042 16.0872 22.1135 15.8045 22.1546 15.4929C22.2498 14.7697 22.0538 14.0384 21.6098 13.4598C21.3787 13.1586 21.0782 12.9397 20.7378 12.7258C20.464 12.5538 20.3121 12.2778 20.3121 11.9999C20.3121 11.7221 20.464 11.4462 20.7377 11.2742C21.0783 11.0603 21.3788 10.8414 21.6099 10.5401C22.0539 9.96149 22.2499 9.23019 22.1547 8.50708C22.1136 8.19546 22.0043 7.91274 21.8645 7.6273C21.7302 7.35313 21.5447 7.03183 21.3224 6.64695L21.2972 6.60318C21.0749 6.21825 20.8894 5.89688 20.7191 5.64347C20.5418 5.37967 20.3517 5.1436 20.1023 4.95225C19.5237 4.50826 18.7924 4.3123 18.0692 4.4075C17.6928 4.45706 17.353 4.60782 16.9975 4.79572C16.7117 4.94679 16.3967 4.94036 16.1561 4.80144C15.9155 4.66253 15.7524 4.39297 15.7403 4.06991C15.7253 3.66808 15.686 3.2984 15.5407 2.94762C15.2616 2.27379 14.7262 1.73844 14.0524 1.45933C13.762 1.33905 13.4625 1.29241 13.1454 1.27077C12.8407 1.24999 12.4697 1.24999 12.0252 1.25H11.9747ZM10.5216 2.84515C10.5988 2.81319 10.716 2.78372 10.9567 2.76729C11.2042 2.75041 11.5238 2.75 12 2.75C12.4762 2.75 12.7958 2.75041 13.0432 2.76729C13.284 2.78372 13.4012 2.81319 13.4783 2.84515C13.7846 2.97202 14.028 3.21536 14.1548 3.52165C14.1949 3.61826 14.228 3.76887 14.2414 4.12597C14.271 4.91835 14.68 5.68129 15.4061 6.10048C16.1321 6.51968 16.9974 6.4924 17.6984 6.12188C18.0143 5.9549 18.1614 5.90832 18.265 5.89467C18.5937 5.8514 18.9261 5.94047 19.1891 6.14228C19.2554 6.19312 19.3395 6.27989 19.4741 6.48016C19.6125 6.68603 19.7726 6.9626 20.0107 7.375C20.2488 7.78741 20.4083 8.06438 20.5174 8.28713C20.6235 8.50382 20.6566 8.62007 20.6675 8.70287C20.7108 9.03155 20.6217 9.36397 20.4199 9.62698C20.3562 9.70995 20.2424 9.81399 19.9397 10.0041C19.2684 10.426 18.8122 11.1616 18.8121 11.9999C18.8121 12.8383 19.2683 13.574 19.9397 13.9959C20.2423 14.186 20.3561 14.29 20.4198 14.373C20.6216 14.636 20.7107 14.9684 20.6674 15.2971C20.6565 15.3799 20.6234 15.4961 20.5173 15.7128C20.4082 15.9355 20.2487 16.2125 20.0106 16.6249C19.7725 17.0373 19.6124 17.3139 19.474 17.5198C19.3394 17.72 19.2553 17.8068 19.189 17.8576C18.926 18.0595 18.5936 18.1485 18.2649 18.1053C18.1613 18.0916 18.0142 18.045 17.6983 17.8781C16.9973 17.5075 16.132 17.4803 15.4059 17.8995C14.68 18.3187 14.271 19.0816 14.2414 19.874C14.228 20.2311 14.1949 20.3817 14.1548 20.4784C14.028 20.7846 13.7846 21.028 13.4783 21.1549C13.4012 21.1868 13.284 21.2163 13.0432 21.2327C12.7958 21.2496 12.4762 21.25 12 21.25C11.5238 21.25 11.2042 21.2496 10.9567 21.2327C10.716 21.2163 10.5988 21.1868 10.5216 21.1549C10.2154 21.028 9.97201 20.7846 9.84514 20.4784C9.80512 20.3817 9.77195 20.2311 9.75859 19.874C9.72896 19.0817 9.31997 18.3187 8.5939 17.8995C7.86784 17.4803 7.00262 17.5076 6.30158 17.8781C5.98565 18.0451 5.83863 18.0917 5.73495 18.1053C5.40626 18.1486 5.07385 18.0595 4.81084 17.8577C4.74458 17.8069 4.66045 17.7201 4.52586 17.5198C4.38751 17.314 4.22736 17.0374 3.98926 16.625C3.75115 16.2126 3.59171 15.9356 3.4826 15.7129C3.37646 15.4962 3.34338 15.3799 3.33248 15.2971C3.28921 14.9684 3.37828 14.636 3.5801 14.373C3.64376 14.2901 3.75761 14.186 4.0602 13.9959C4.73158 13.5741 5.18782 12.8384 5.18786 12.0001C5.18791 11.1616 4.73165 10.4259 4.06021 10.004C3.75769 9.81389 3.64385 9.70987 3.58019 9.62691C3.37838 9.3639 3.28931 9.03149 3.33258 8.7028C3.34348 8.62001 3.37656 8.50375 3.4827 8.28707C3.59181 8.06431 3.75125 7.78734 3.98935 7.37493C4.22746 6.96253 4.3876 6.68596 4.52596 6.48009C4.66055 6.27983 4.74468 6.19305 4.81093 6.14222C5.07395 5.9404 5.40636 5.85133 5.73504 5.8946C5.83873 5.90825 5.98576 5.95483 6.30173 6.12184C7.00273 6.49235 7.86791 6.51962 8.59394 6.10045C9.31998 5.68128 9.72896 4.91837 9.75859 4.12602C9.77195 3.76889 9.80512 3.61827 9.84514 3.52165C9.97201 3.21536 10.2154 2.97202 10.5216 2.84515Z"
                    fill="#878c9d"
                  ></path>
                </g>
              </svg>
              Настройки статуса и событий &nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
          <div
            @click="changeTab2"
            :class="openTab ? 'dct-active-tab' : ''"
            class="dct-drawer-tab"
          >
            <p class="flex items-center gap-2.5">
              <svg
                viewBox="0 0 512 512"
                class="w-[28px] h-[28px]"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <title>calendar-settings</title>
                  <g
                    id="Page-1"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g
                      id="add"
                      fill="#000000"
                      transform="translate(64.000000, 64.000000)"
                    >
                      <path
                        fill="#878c9d"
                        d="M328.180488,192 L328.181163,214.835964 C338.584391,218.513072 348.098741,224.071849 356.315274,231.103357 L376.112086,219.673321 L405.741716,270.993345 L385.957797,282.416658 C386.931071,287.685135 387.439747,293.116497 387.439747,298.666667 C387.439747,304.216944 386.931052,309.648409 385.957741,314.916982 L405.741716,326.339988 L376.112086,377.660012 L356.315274,366.229977 C348.098741,373.261484 338.584391,378.820261 328.181163,382.49737 L328.180488,405.333333 L268.921228,405.333333 L268.920553,382.49737 C258.51771,378.820398 249.00368,373.261896 240.787356,366.230759 L220.98963,377.660012 L191.36,326.339988 L211.143975,314.916982 C210.170664,309.648409 209.661969,304.216944 209.661969,298.666667 C209.661969,293.116146 210.170709,287.684447 211.144103,282.415657 L191.36,270.993345 L220.98963,219.673321 L240.786362,231.103425 C249.002913,224.071886 258.517291,218.513084 268.920553,214.835964 L268.921228,192 L328.180488,192 Z M384,1.42108547e-14 L384.00279,203.261953 C371.691051,192.242003 357.233555,183.570174 341.334283,177.950446 L341.333333,128 L42.6666667,128 L42.6666667,341.333333 L177.950446,341.334283 C183.570022,357.233124 192.241533,371.690267 203.261056,384.001788 L1.42108547e-14,384 L1.42108547e-14,1.42108547e-14 L384,1.42108547e-14 Z M298.550858,263.111111 C278.914067,263.111111 262.995302,279.029876 262.995302,298.666667 C262.995302,318.303458 278.914067,334.222222 298.550858,334.222222 C318.187649,334.222222 334.106413,318.303458 334.106413,298.666667 C334.106413,279.029876 318.187649,263.111111 298.550858,263.111111 Z M128,256 L128,298.666667 L85.3333333,298.666667 L85.3333333,256 L128,256 Z M128,170.666667 L128,213.333333 L85.3333333,213.333333 L85.3333333,170.666667 L128,170.666667 Z M213.333333,170.666667 L213.33092,203.261616 C209.791581,206.429571 206.429571,209.791581 203.261616,213.33092 L170.666667,213.333333 L170.666667,170.666667 L213.333333,170.666667 Z M341.333333,42.6666667 L42.6666667,42.6666667 L42.6666667,85.3333333 L341.333333,85.3333333 L341.333333,42.6666667 Z"
                        id="Combined-Shape"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
              Настройка календарей &nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
        </div>
        <div
          class="dct-drawer-main-section w-full h-fit bg-[#fff] z-10"
          :style="calendarSettingsStore.loader ? 'overflow:hidden' : ''"
        >
          <div v-if="!openTab" class="grid grid-cols-1 gap-4 w-full h-full">
            <div
              class="w-full border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
            >
              <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Настройки статуса и событий
              </h2>
              <MultilevelSelect
                popover="Необходимо выбрать этап amoCRM. При переходе сделки на данный этап, будет создано событие в Google Календарь"
                label="Статус"
                name="settings_status_id"
                :settings="{
                  selected: {
                    parent_id: settings.pipeline_id,
                    child_id: settings.status_id,
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
                @update:value="handleStatus"
              />
              <Select
                label="События"
                :options="selects"
                popover="Дополнительный параметр для создания события в Google Календарь.
Здесь можно выбрать услугу которую вы оказываете и при переходе в этап, если поле будет заполнено и будет выбран этот параметр, событие будет создано именно в этом календаре. "
                optionKey="name"
                :selected="settings.services_parent_id"
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
              <div class="w-full" v-if="settings.services.length > 0">
                <ul class="p-0 space-y-1 text-gray-500 list-none mt-2">
                  <template
                    v-for="(service, index) in settings.services"
                    :key="index"
                  >
                    <li class="flex flex-auto items-end" :data-key="service.id">
                      <div class="flex gap-2 justify-between items-end w-full">
                        <Select
                          :options="services"
                          optionKey="service_value"
                          :selected="service.service_id"
                          selected-key="service_id"
                          name="service_id"
                          @update:value="handleService($event, index)"
                        />
                        <Select
                          :options="calendars"
                          optionKey="summary"
                          :selected="service.calendar_id"
                          selected-key="id"
                          name="calendar_id"
                          @update:value="handleCalendar($event, index)"
                        />
                      </div>
                      <button
                        type="button"
                        @click="deleteItem(index, service.service_id)"
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
              <div class="w-full" v-if="settings.services.length > 0">
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
              class="w-full border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
            >
              <h2
                class="mb-4 text-xl font-bold text-gray-900 dark:text-white flex"
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
                <Toggle v-model="usePcker" class="ml-0" />
                <div class="flex gap-2 justify-between items-end">
                  <Select
                    :disabled="useInput"
                    label="Начало события (дата и время)"
                    :options="fields"
                    :selected="settings.start_date_id"
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
                    :selected="settings.end_date_id"
                    selected-key="id"
                    name="end_date_id"
                    @update:value="handleEndDate"
                  />
                </div>
              </div>
              <div class="">
                <Toggle v-model="useInput" />
                <div class="flex gap-2 justify-between items-end">
                  <Select
                    label="Начало события (дата и время)"
                    :disabled="usePcker"
                    :options="fields"
                    :selected="settings.start_date_id"
                    optionKey="name"
                    selected-key="id"
                    name="start_date_id"
                    @update:value="handleStartDate"
                  />
                  <div class="flex flex-col">
                    <label
                      class="dct-label -mb-1.5 text-sm text-gray-900 dark:text-white"
                      >Укажите длительность</label
                    >
                    <div class="flex justify-start items-center gap-2">
                      <div class="flex justify-start items-end gap-2">
                        <Input
                          :disabled="usePcker"
                          type="text"
                          name="date_district_start"
                          v-model="settings.date_district_start"
                          :pattern="['# час']"
                          placeholder="1 час"
                        />
                      </div>
                      <div class="flex justify-start items-end gap-2">
                        <Input
                          :disabled="usePcker"
                          type="text"
                          name="date_district_end"
                          v-model="settings.date_district_end"
                          :pattern="['## мин']"
                          placeholder="00 мин"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- card 3 -->
            <div
              class="w-full border border-gray-200 rounded-lg py-3 dark:bg-gray-800 dark:border-gray-700"
            >
              <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
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
                :selected="settings.event_address_id"
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
              <div class="my-2 relative">
                <div class="flex">
                  <label
                    for="description"
                    class="dct-label block mb-1 text-sm font-medium text-gray-900 dark:text-white"
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
                <textarea
                  id="description"
                  rows="8"
                  class="dct-textarea-v2 block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Вставьте сюда..."
                  v-model="settings.event_body"
                ></textarea>
                <button
                  @click="toggleTemplate"
                  type="button"
                  class="dct-button-absolute absolute text-white bg-[#2a7cef] hover:bg-[#5c8bf9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#2a7cef] dark:hover:bg-[#2a7cef] dark:focus:ring-blue-800"
                >
                  {{ isOpenTemplate ? "закрыть" : "открыть" }} Шаблонизатор
                </button>
              </div>
              <div class="pt-3" v-if="isOpenTemplate">
                <div class="h-[300px] overflow-y-auto custom-scroll">
                  <ul class="dct-ul mt-0 pl-0">
                    <template
                      v-for="(marker, key) in selectStore.markers"
                      :key="key"
                    >
                      <ShablonItem
                        @copy:value="copyMarker"
                        :marker="marker"
                        :group="key"
                      />
                    </template>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="openTab"
            class="w-full h-screen ml-0"
            style="margin-left: 0px !important; background: #ffffff !important"
          >
            <CalendarSettings />
          </div>
        </div>
      </div>
      <div
        class="flex justify-start sticky bottom-0 bg-white px-[20px] py-[13px] w-full z-20 gap-2"
        style="box-shadow: rgba(22, 36, 61, 0.14) 3px 12px 32px"
      >
        <button
          @click="handleSave"
          type="button"
          class="dct-button text-white bg-[#2a7cef] hover:bg-[#5c8bf9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#2a7cef] dark:hover:bg-[#2a7cef] dark:focus:ring-blue-800"
          :class="calendarSettingsStore.loader ? 'pointer-events-none' : ''"
        >
          Сохранить
        </button>
        <button
          @click="closeModal"
          type="button"
          class="text-gray-500 border-[2px] border-solid border-[#efefef] bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:focus:ring-gray-600"
        >
          Закрыть
        </button>
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

const settingsStore = useSettingsStore();
const selectStore = useSelectStore();

const { settings } = storeToRefs(settingsStore);
const { fields, statuses, calendars, selects, markers } =
  storeToRefs(selectStore);
const calendarSettingsStore = useCalendarSettingsStore();

const props = defineProps({
  account: [Number, null],
  subdomainId: Number,
});

const emit = defineEmits(["close-drawer"]);
// logic
const useInput = ref(false);
const usePcker = ref(true);

const isOpenTemplate = ref(false);
const canAddNewItem = ref(true);
const services = ref(null);
const openTab = ref(false);

function changeTab1() {
  openTab.value = false;
}

function changeTab2() {
  openTab.value = true;
}

function toggleTemplate() {
  isOpenTemplate.value = !isOpenTemplate.value;
}

function copyMarker(id) {
  settings.value.event_body =
    settings.value.event_body === null
      ? ""
      : settings.value.event_body + " " + id;
}

function handleAddress(value) {
  settings.value.event_address_id = value;
}

function handleTaskName(value) {
  settings.value.event_name_id = value;
}

function handleStartDate(value) {
  settings.value.start_date_id = value;
}

function handleEndDate(value) {
  settings.value.end_date_id = value;
}

function handleServiceParentId(parentId) {
  settings.value.services_parent_id = parentId;
  services.value = getServices(parentId);
  settings.value.services = [{}];
}

function getServices(parentId) {
  console.log(selects.value);
  return selects.value
    .find((select) => select.id === parentId)
    .options.map((option) => {
      return {
        service_id: option.id,
        service_value: option.value,
      };
    });
}

function handleService(serviceId, index) {
  const service = services.value.find((item) => item.service_id === serviceId);
  settings.value.services[index].service_id = service.service_id;
  settings.value.services[index].service_value = service.service_value;
  settings.value.services[index].order = index;
  //   servicesToDeleteFromSelect.value.push(serviceId);
  //   services.value = services.value.filter((service) => service.id !== serviceId);
}

function handleCalendar(calendar_id, index) {
  settings.value.services[index].calendar_id = calendar_id;
}

function handleStatus(option) {
  settings.value.pipeline_id = option.parent;
  settings.value.status_id = option.child;
}

async function handleSave() {
  try {
    calendarSettingsStore.loader = true;
    await settingsStore.saveSettings(props.account);
    await calendarSettingsStore.saveCalendar(props.account);
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
  settings.value.services.push({});
  checkCanAddNewItem();
}

function checkCanAddNewItem() {
  if (services.value.length <= settings.value.services.length) {
    canAddNewItem.value = false;
  } else {
    canAddNewItem.value = true;
  }
}

async function deleteItem(index, id) {
  settings.value.services.splice(index, 1);
  //   servicesToDeleteFromSelect.value = servicesToDeleteFromSelect.value.filter(
  //     (s) => s !== id
  //   );
  checkCanAddNewItem();
}

function closeModal() {
  document.getElementById("drawer-example").classList.add("hidden");
  emit("close-drawer");
}

watch(useInput, (newValue) => {
  settings.value.start_date_id = null;
  settings.value.end_date_id = null;
  usePcker.value = !newValue;
});

watch(usePcker, (newValue) => {
  settings.value.date_district_start = null;
  settings.value.date_district_end = null;

  settings.value.start_date_id = null;
  useInput.value = !newValue;
});

function extractFirstNumber(inputString) {
  // Use a regular expression to find the first sequence of digits
  const match = inputString.match(/\d+/);

  // If a match is found, convert it to a number and return it; otherwise, return NaN
  return match ? Number(match[0]) : NaN;
}

onMounted(async () => {
  usePcker.value = !settings.value.date_district;
  useInput.value = !!settings.value.date_district;
  console.log(settings.value.date_district);
  if (settings.value.date_district) {
    let array = settings.value.date_district.split(",");
    settings.value.date_district_start = extractFirstNumber(array[0]);
    settings.value.date_district_end = extractFirstNumber(array[1]);
    console.log(
      settings.value.date_district_start,
      settings.value.date_district_end
    );
  }

  document.getElementById("drawer-example").classList.remove("hidden");
  services.value = [];
  if (settings.value.services_parent_id) {
    services.value = getServices(settings.value.services_parent_id);
  }
  await calendarSettingsStore.getCalendars(
    settingsStore.settings.google_account_id
  );
});
</script>
