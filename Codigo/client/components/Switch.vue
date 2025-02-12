<script lang="ts">
export default {
  name: "Checkbox",
  props: {
    modelValue: Boolean,
    disabled: Boolean,
  },
  emits: ["update:modelValue"],
  setup() {
    return {
      model: ref(false),
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
    changeModel() {
      this.model = !this.model;
      this.$emit("update:modelValue", this.model);
    },
  },
};
</script>

<template>
  <div
    class="flex items-center gap-xs cursor-pointer"
    :class="{ disabled: disabled }"
    role="switch"
    :aria-checked="model"
    :aria-disabled="disabled"
    @click="changeModel"
  >
    <div
      class="w-[48px] p-xxs rounded-full transition"
      :class="[model ? 'bg-primary-500' : 'bg-gray-300']"
    >
      <div
        class="relative w-[20px] h-[20px] rounded-full bg-white transition"
        :class="[model ? 'ml-[24px]' : 'ml-0']"
      />
    </div>
    <p class="text-12 text-gray-500">
      <slot />
    </p>
  </div>
</template>

<style scoped>
.transition {
  @apply transition-all duration-150 ease-out;
}
.disabled {
  @apply pointer-events-none;

  div {
    @apply bg-gray-200;
  }

  p {
    @apply text-gray-300;
  }
}
</style>
