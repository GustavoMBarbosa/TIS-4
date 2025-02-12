<script lang="ts">
export default {
  name: "SelectContainer",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    icon: String,
    label: String,
    searchable: Boolean,
    disabled: Boolean,
    required: Boolean,
  },
  emits: ["update:modelValue"],
  setup() {
    return {
      model: ref(false),
      content: ref(),
      container: ref(),
      labelContainer: ref(),
      resizeObserver: null,
    };
  },

  beforeMount() {
    this.resizeObserver = new ResizeObserver(this.resize);
  },

  mounted() {
    this.model = this.modelValue;

    if (this.container)
      this.resizeObserver.observe(this.container, { box: "border-box" });
    if (this.content)
      this.resizeObserver.observe(this.content, { box: "border-box" });
    if (this.labelContainer)
      this.resizeObserver.observe(this.labelContainer, { box: "border-box" });

    
    document.addEventListener('click', this.onBlur);
  },

  updated() {
    this.resize();
  },

  beforeUnmount() {
    if (this.resizeObserver) this.resizeObserver.disconnect();
    document.removeEventListener('click', this.onBlur);
  },

  watch: {
    modelValue() {
      this.model = this.modelValue;
    },
  },

  methods: {
    onBlur(e: MouseEvent) {
      if (
        !this.model ||
        !e.target ||
        !(e.target instanceof Element)
      )
        return;

      const clickedContainer = e.target.closest(".select-container");
      if (this.container != clickedContainer)
        this.changeModel(false, 'blur');
    },

    changeModel(value: boolean, source?: string) {
      if (this.searchable && source == 'click') value = true;

      this.model = value;
      this.$emit("update:modelValue", this.model, source);
    },

    resize() {
      if (!this.labelContainer || !this.content) return;

      this.content.style.maxHeight = this.model
        ? `${this.content.scrollHeight + 1}px`
        : "0px";

      this.content.style.width = "fit-content";
      this.labelContainer.style.width = "";

      const width = Math.max(
        this.content.offsetWidth,
        this.labelContainer.offsetWidth
      );

      if (
        this.container &&
        (this.container.style.width || this.container.offsetWidth != width)
      ) {
        this.content.style.width = "100%";
        this.labelContainer.style.width = "100%";
      } else {
        this.content.style.width = `${width}px`;
        this.labelContainer.style.width = `${width}px`;
      }
    },
  },
};
</script>

<template>
  <div class="flex flex-col gap-xs max-w-full">
    <label v-if="label" class="text-12 text-gray-500 font-bold">
      {{ label }}
      <span v-if="required" class="text-primary-500">*</span>
    </label>
    <div
      ref="container"
      class="select-container relative"
    >
      <div
        ref="labelContainer"
        class="label-container"
        @click="changeModel(!model, 'click')"
        :class="{ active: model, disabled: disabled }"
      >
        <div class="flex gap-xs truncate w-full">
          <Icon :name="icon" class="select-none" v-if="icon" />
          <slot />
        </div>
        <Icon
          name="arrow_drop_down"
          class="transition duration-150 select-none"
          :class="{ 'rotate-180': model }"
        />
      </div>
      <div
        ref="content"
        class="select-content absolute z-10 top-full left-0 overflow-hidden transition-[max-height] bg-white"
        :class="{ active: model }"
        style="max-height: 0"
      >
        <slot name="items" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.label-container {
  @apply flex items-center justify-between bg-white h-[30px] rounded-8 border-1 border-gray-300 px-base py-sm cursor-pointer;

  .material-symbols-rounded {
    @apply text-16 text-gray-500;
  }
}

.label-container.active {
  @apply border-primary-500 border-b-gray-300 rounded-b-none;

  .material-symbols-rounded {
    @apply text-primary-500;
  }
}

.active.select-content {
  @apply border-1 border-primary-500 border-t-0 rounded-b-8;
}

.disabled {
  @apply pointer-events-none border-gray-300 bg-gray-200;
}
</style>
