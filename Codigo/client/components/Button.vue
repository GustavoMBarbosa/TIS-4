<script lang="ts">
export default {
  name: "Button",
  props: {
    type: {
      type: String,
      default: () => "primary",
    },
    size: {
      type: String,
      default: () => "medium",
    },
    secondary: Boolean,
    disabled: Boolean,
    loading: Boolean,
  },
  emits: ["click"],
  computed: {
    icon() {
      return this.type == "success" ? "check" : "close";
    },
  },
};
</script>

<template>
  <button
    class="button"
    :class="[
      type,
      size,
      {
        secondary: secondary,
        disabled: disabled,
        'pointer-events-none': loading,
      },
    ]"
    @click="$emit('click')"
  >
    <Spinner class="absolute" v-if="loading" />
    <Icon class="absolute text-20" v-else-if="type != 'primary'" :name="icon" />
    <div :class="{ invisible: loading || type != 'primary' }">
      <slot />
    </div>
  </button>
</template>

<style scoped>
.button {
  @apply relative flex items-center justify-center uppercase rounded-8 font-bold text-white border-1 transition-all active:scale-95;
}

.button.disabled {
  @apply pointer-events-none bg-gray-300 border-gray-300;
}

.button.disabled.secondary {
  @apply text-gray-300 bg-transparent;
}

.button.small {
  @apply text-10 px-lg py-sm h-[30px];
}

.button.medium {
  @apply text-12 px-xl py-base;
}

.primary {
  @apply bg-primary-500 border-primary-500 hover:bg-primary-800 hover:border-primary-800;
}

.primary.secondary {
  @apply bg-transparent text-primary-500 hover:bg-primary-500 hover:text-white hover:border-primary-500;
}

.success {
  @apply pointer-events-none bg-green-500 border-green-500;
}

.success.secondary {
  @apply bg-transparent text-green-500;
}

.error {
  @apply pointer-events-none bg-red-500 border-red-500;
}

.error.secondary {
  @apply bg-transparent text-red-500 hover:bg-primary-500 hover:text-white;
}
</style>
