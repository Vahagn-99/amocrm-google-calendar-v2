<template>
  <div class="w-[100%] ">
    <div class="flex" v-if="label">
      <label
        v-if="label"
        :for="name"
        class="dct-label mt-4 mb-2 text-sm text-gray-900 dark:text-white"
        >{{ label }}
      </label>
      <popover v-if="popover" :context="popover" />
    </div>
    <input
      :disabled="disabled"
      :type="type"
      :name="name"
      :id="name"
      :max="max?max:''"
      @input="inputEvent()"
      @blur="blurEvent()"
      @change="changeEvent()"
      :placeholder="placeholder"
      v-maska
      :data-maska="pattern"
      class="dct-input-v2 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full "
      :class="{
        'dct-input-v2':v2,
        'dct-input':!v2,
        'h-[38px] pl-3':isInputPhone,
        'p-2.5 pr-[30px]':!isInputPhone,
        'text-gray-100 border-gray-100': disabled,
        'text-gray-900 border-gray-300': !disabled,
      }"
      v-model="value"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { vMaska } from "maska";
import Popover from "../Popover.vue";

const props = defineProps({
  v2:{
    type:Boolean,
    default:true
  },
  popover: {
    type: [String, Boolean],
    default: false,
  },
  label: {
    type: [String, Boolean],
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  pattern: {
    type: Array,
    required: false,
  },
  max: {
    type: Number,
    required: false,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  defaultValue: {
    type: [String, Number, Boolean],
    default: false,
  },
  disabled: Boolean,
  modelValue: String,
  isInputPhone: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits([
  "update:modelValue",
  "event:input",
  "event:blur",
  "event:change",
]);
const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});

function inputEvent() {
  emits("event:input", value.value);
}

function blurEvent() {
  emits("event:blur", value.value);
}

function changeEvent() {
  emits("event:change", value.value);
}
</script>
