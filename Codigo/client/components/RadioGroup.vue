<script lang="ts">
export default {
  name: "Radio",
  props: {
    modelValue: [String, Number, Object, Array],
    items: Array,
    vertical: Boolean,
    disabled: Boolean,
  },
  emits: ["update:modelValue"],
  setup() {
    return {
      model: ref(),
    };
  },

  created() {
    this.model = this.modelValue;
  },

  watch: {
    modelValue() {
      this.model = this.modelValue;
    },
  },

  methods: {
    changeModel(value: any) {
      this.model = value;
      this.$emit("update:modelValue", this.model);
    },
  },
};
</script>

<template>
  <div class="flex gap-sm" :class="{ vertical: vertical }">
    <div
    v-for="(item, index) in items"
      :key="index"
      class="flex items-center gap-xs cursor-pointer"
      :class="{ active: model == item.value, disabled: disabled }"
      @click="changeModel(item.value)"
    >
      <div class="border-1 border-gray-400 rounded-full p-[2.5px]">
        <div class="w-[8px] h-[8px] rounded-full" />
      </div>
      <p class="text-12 text-gray-500">
        {{ item.label }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.vertical {
  @apply flex-col;
}
.active {
  div {
    @apply border-primary-500;

    div {
      @apply bg-primary-500;
    }
  }

 p {
  @apply font-bold;
 }
}

.disabled, .active.disabled {
  @apply pointer-events-none;

  div {
    @apply bg-gray-300;

    div {
      @apply bg-transparent;
    }
  }

 p {
  @apply text-gray-400;
 }
}
</style>
