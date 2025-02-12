<script lang="ts">
export default {
  name: "RoundButton",
  props: {
    variant: {
      type: String,
      default: "primary",
    },
    size: {
      type: String,
      default: "medium",
    },
    icon: String,
    disabled: Boolean,
  },
  emits: ["click"],
};
</script>

<template>
  <button
    class="rounded-button"
    :class="[variant, size, { disabled: disabled }]"
    @click="$emit('click')"
  >
    <Icon :name="icon ? icon : 'add'" />
    <p v-if="$slots.default"><slot /></p>
  </button>
</template>

<style scoped>
.rounded-button {
  @apply flex items-center gap-xs uppercase rounded-full font-bold text-white border-1 active:scale-95;
}

.rounded-button.disabled {
  @apply pointer-events-none bg-gray-300 border-gray-300;
}

.rounded-button.small {
  @apply text-10 p-xxs;

  .icon {
    @apply text-16;
  }

  p {
    @apply mr-xxs;
  }
}

.rounded-button.medium {
  @apply text-12 p-xs;

  .icon {
    @apply text-20;
  }

  p {
    @apply mr-xs;
  }
}

.primary {
  @apply bg-primary-500 border-primary-500 hover:bg-primary-800 hover:border-primary-800;
}
</style>
