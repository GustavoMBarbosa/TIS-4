<script lang="ts">
export default {
  setup() {
    const showCard = ref(false);
    const isExpanded = ref(false);
    const card = ref<HTMLDivElement>();
    const content = ref<HTMLDivElement>();
    const resizeObserver = ref<ResizeObserver>();
    const mutationObserver = ref<MutationObserver>();

    return {
      showCard,
      mutationObserver,
      resizeObserver,
      isExpanded,
      card,
      content,
    };
  },

  mounted() {
    this.resizeObserver = new ResizeObserver(this.resize);
    this.mutationObserver = new MutationObserver(this.resize);

    if (this.card)
      this.resizeObserver.observe(this.card, { box: "border-box" });
    if (this.content) {
      this.resizeObserver.observe(this.content, { box: "border-box" });
      this.mutationObserver.observe(this.content, {
        childList: true,
        subtree: true,
      });
    }
  },

  updated() {
    this.resize();
  },

  beforeUnmount() {
    if (this.resizeObserver) this.resizeObserver.disconnect();
    if (this.mutationObserver) this.mutationObserver.disconnect();
  },

  methods: {
    resize() {
      if (!this.content) return;

      this.content.style.maxHeight = this.isExpanded
        ? `${this.content.scrollHeight}px`
        : "0px";
      this.content.style.width = "fit-content";
      const maxWidth = Math.max(this.content.offsetWidth);

      if (
        this.card &&
        (this.card.style.width || this.card.offsetWidth != maxWidth)
      ) {
        this.content.style.width = "100%";
      } else {
        this.content.style.width = `${maxWidth}px`;
      }
    },

    changeExpanded() {
      this.isExpanded = !this.isExpanded;
      this.resize();

      if (!this.isExpanded) {
        setTimeout(() => {
          this.showCard = false;
        }, 150);
      } else {
        this.showCard = true;
      }
    },
  },
};
</script>

<template>
  <Card>
    <div class="w-full flex flex-col gap-base" ref="card">
      <div
        class="flex items-center justify-end w-full text-16 font-bold"
        :class="{ 'justify-between': $slots.header }"
      >
        <slot name="header" />
        <div
          class="flex items-center w-fit h-fit transition-transform ease-in-out duration-300 cursor-pointer"
          :class="{ 'rotate-180': isExpanded }"
          @click="changeExpanded"
        >
          <Icon name="expand_more" />
        </div>
      </div>
      <div
        v-show="showCard"
        ref="content"
        class="content-wrapper transition-[max-height]"
        :class="{ 'is-hidden overflow-hidden': !isExpanded }"
      >
        <slot />
      </div>
    </div>
  </Card>
</template>

<style scoped>
* {
  @apply text-gray-500;
}
.content-wrapper {
  transition: max-height 150ms;
}
</style>
