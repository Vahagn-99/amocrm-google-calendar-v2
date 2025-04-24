<template>
  <div class="w-[100%] mt-2">
    <div class="flex mt-2">
      <label
          :class="{'opacity-40':isDisabled}"
        v-if="label"
        :for="name"
        class="dct-label mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >{{ label }}
      </label>
      <Popover v-if="popover" >
        <template #title>
          <h3 style="font-weight: 800">{{label}}</h3>
        </template>
        <template #context>
          {{popover}}
        </template>
      </Popover>
    </div>
  </div>
</template>

<script setup>
import Popover from "../Popover.vue";

const props = defineProps({
  isDisabled: {
    type: Boolean,
    default: false,
  },
  popover: {
    type: [String, Boolean],
    default: false,
  },
  label: {
    type: [String, Boolean],
    default: false,
  },
});

</script>
