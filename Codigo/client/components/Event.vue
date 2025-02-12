<script lang="ts">
import { formatTime } from "~/util";

export default {
  name: "Event",

  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
    showHour: Boolean,
  },
  emits: ["update:modelValue"],

  methods: {
    getHour(date: Date) {
      return formatTime(new Date(date));
    },
  },
};
</script>

<template>
  <div class="event">
    <span class="font-medium">
      {{ modelValue.pacient && modelValue.pacient.name ? modelValue.pacient.name : "Ausente" }}
    </span>
    <div class="flex items-center gap-xxs text-10" v-if="showHour">
      {{ getHour(modelValue.startDate) }}
      -
      {{ getHour(modelValue.endDate) }}
    </div>
  </div>
</template>

<style scoped>
.event {
  @apply flex flex-col justify-center gap-xxs border-1 border-l-[4px] border-primary-700 rounded-r-4 z-[1] w-full bg-primary-500 cursor-pointer text-white text-12 py-xs px-base whitespace-normal break-all;
}
</style>
