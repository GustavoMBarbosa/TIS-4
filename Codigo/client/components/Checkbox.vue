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
    changeModel(value: boolean) {
      this.model = value;
      this.$emit("update:modelValue", this.model);
    },
  },
};
</script>

<template>
  <div
    class="checkbox-holder"
    :class="{ active: model, disabled: disabled }"
    @click="changeModel(!model)"
  >
    <div class="checkbox">
      <svg
        v-show="model === true"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="w-full h-full"
        style="stroke: currentColor"
      >
        <path
          id="Vector"
          d="M11.15 6L7.04998 9.9375L5 7.96875"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <p class="text-12"><slot /></p>
  </div>
</template>

<style scoped>
.checkbox-holder {
    @apply flex items-center cursor-pointer gap-xs;

    p {
        @apply text-gray-500;
    }
}

.checkbox {
    @apply w-[16px] h-[16px] rounded-4 border-1 border-gray-300 text-white;
}

.checkbox-holder.active {
    .checkbox {
        @apply bg-primary-500 border-primary-500;
    }

    p {
        @apply font-bold;
    }
}

.checkbox-holder.disabled, .checkbox-holder.active.disabled {
    @apply pointer-events-none;

    .checkbox {
        @apply bg-gray-300  bg-gray-300;
    }

    p {
        @apply font-normal;
    }
}
</style>
