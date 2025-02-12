<script lang="ts">
export default {
  name: "Sidebar",

  props: {
    modelValue: Boolean,
    loading: Boolean,
    title: String,
    width: {
      type: String,
      default: () => "300px",
    },
  },
  emits: ["update:modelValue", "save"],

  setup() {
    return {
      model: ref(false),
    };
  },

  watch: {
    modelValue() {
      this.model = this.modelValue;
    },
  },

  methods: {
    closeSidebar() {
      this.model = false;
      this.$emit("update:modelValue", this.model);
    },
    save() {
      this.$emit("save");
    },
  },
};
</script>

<template>
  <Transition name="fade-in">
    <div class="full-screen-bg" :class="{ 'pointer-events-none': loading }" v-if="model" @click="closeSidebar" />
  </Transition>
  <Transition name="slide-in">
    <div class="side-panel" v-if="model">
      <div class="flex flex-col gap-lg">
        <header class="flex items-center justify-between">
          <h1 class="text-gray-500 text-16 font-bold">{{ title }}</h1>
          <div class="flex items-center" :class="{ 'pointer-events-none': loading }">
            <slot name="actions" />
            <div class="close" @click="closeSidebar">
              <Icon name="close" />
            </div>
          </div>
        </header>
        <div>
          <slot />
        </div>
      </div>
      <div class="flex self-end gap-sm">
        <Button secondary @click="closeSidebar" :disabled="loading">Cancelar</Button>
        <Button @click="save" :loading="loading">Salvar</Button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity 0.5s ease;
}

.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0;
}

.fade-in-enter-to,
.fade-in-leave-from {
  opacity: 1;
}

.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform 0.5s ease;
}

.slide-in-enter-from,
.slide-in-leave-to {
  transform: translateX(100%);
}

.slide-in-enter-to,
.slide-in-leave-from {
  transform: translateX(0%);
}

.full-screen-bg {
  @apply fixed z-50 top-0 left-0 flex items-center justify-end w-full h-screen bg-gray-500/60;
}

.side-panel {
  @apply fixed z-[60] bottom-0 right-0 flex flex-col justify-between bg-white shadow-normal h-screen p-xl;
  width: v-bind(width);
}

.close {
  @apply flex items-center gap-xs p-xs cursor-pointer text-gray-400 select-none font-bold text-12 hover:bg-gray-100 ease-in-out duration-300 rounded-full w-fit;
}

.icon {
  @apply text-24;
}

@media screen and (max-width: 768px) {
  .slide-in-enter-from,
  .slide-in-leave-to {
    transform: translateY(100%);
  }
  .slide-in-enter-to,
  .slide-in-leave-from {
    transform: translateY(0%);
  }

  .side-panel {
    @apply w-full;
  }
}
</style>
