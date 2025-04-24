<template>
  <div class="w-[100%]">
    <select
      :name="name"
      :id="name"
      v-model="selectedValue"
      @change="handleSelect"
      ref="selectElement"
      :class="{'pointer-events-none':isDisabled}"
      class="dct-select-v2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <template v-if="!isDisabled">
        <template v-for="(option, key) in settings_body.options" :key="key">
          <option class="font-bold" disabled>
            {{ getParentLabel(option) }}
          </option>
          <template v-for="(child, nestedKey) in option[settings_body.option.nested]" :key="nestedKey">
            <option
                v-if="check(child.id)"
                :data-value="getSelected(option, child)"
                :value="getNestedkey(child)"
            >
              {{ getNestedValue(child) }}
            </option>
          </template>
        </template>
      </template>

    </select>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useSettingsStore} from "../../stores/settings";
import {storeToRefs} from "pinia";

const props = defineProps({
  isDisabled: {
    type: Boolean,
    default: false,
  },
  settings_body: {
    type: Object,
    required: true,
  },
  pix:{
    type:Number,
  },
  name: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["update:value"]);

const selectedValue = ref(props.settings_body.selected.child_id);
const selectElement = ref(null);
const settingStore=useSettingsStore()
const {settings}=storeToRefs(settingStore)
function getParentLabel(option) {
  return option[props.settings_body.option.value];
}

function check(id){
   return (!(settings.value.delete_status_ids.includes(''+id) || settings.value.status_ids.includes(''+id)))||id==selectedValue.value;
}


function getNestedkey(child) {
  return child[props.settings_body.nested.key];
}

function getSelected(option, child) {
  return option.id + "p" + child[props.settings_body.nested.key];
}

function getNestedValue(child) {
  return child[props.settings_body.nested.value];
}

function handleSelect() {
  const selectedOption = selectElement.value.selectedOptions[0];
  const dataValue = selectedOption.dataset.value;
  const selectedValues = {
    parent: dataValue.split("p")[0],
    child: dataValue.split("p")[1],
  };
  emits("update:value", selectedValues, props.pix);
}


</script>
