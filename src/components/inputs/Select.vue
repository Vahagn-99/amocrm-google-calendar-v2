<template>
  <div class="w-[100%] mt-4">
    <div class="flex ">
      <label
        v-if="label"
        :for="name"
        class="dct-label mb-2 text-sm  text-gray-900 dark:text-white"
        >{{ label }}
      </label>
      <Popover v-if="popover">
        <template #title>
          <h3 style="font-weight: 800">{{label}}</h3>
        </template>
        <template #context>
          <slot name="popover">
          </slot>
        </template>
      </Popover>

    </div>
    <select
        :title="title"
      :disabled="disabled"
      :name="name"
      :id="name"
      v-model="selectedValue"
      @change="handleSelect"
      class="dct-select-v2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option
        :disabled="checkIfDissabled(option[selectedKey])"
        v-for="(option, key) in options"
        :key="key"
        :value="option[selectedKey]"
      >
        {{ getSerializable(option) }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Popover from "../Popover.vue";

const props = defineProps({
  popover: {
    type: [String, Boolean],
    default: false,
  },
  label: {
    type: [String, Boolean],
    default: false,
  },
  selected: {
    type: [String, Object, Number],
    required: false,
  },
  dissabledOptionsIds: {
    type: Array,
    required: false,
  },
  selectedKey: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  options: {
    type: [Array, Object],
  },
  optionKey: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  title:{
    type:String
  }
});

const emits = defineEmits(["update:value"]);

const selectedValue = ref(props.selected);

function checkIfDissabled(option) {
  if (!props.dissabledOptionsIds) {
    return;
  }
  return props.dissabledOptionsIds.includes(option);
}

function getSerializable(item) {
  return !!props.optionKey ? item[props.optionKey] : item;
}
function handleSelect() {
  emits("update:value", selectedValue.value);
}
</script>
