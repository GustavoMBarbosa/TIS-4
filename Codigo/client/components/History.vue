<template>
  <div class="history">
    <div class="flex flex-col gap-lg" v-if="loading">
      <div class="skeleton" v-for="i in 10" :key="i" />
    </div>
    <div v-else-if="pagedItems.length">
      <div
        v-for="(item, index) in pagedItems"
        :key="index"
        class="item"
        :class="[
          {
            'first-item': index == 0,
            'last-item': !pagedItems[index + 1],
            active: isActive(item, index),
            disabled: disabled,
          },
        ]"
      >
        <div class="circle" />
        <div class="custom-border" />
        <div class="content">
          <p class="label" @click="updateModel(item)">
            <slot
              name="item"
              :item="item"
              :index="getIndex(index)"
              :active="isActive(item, index)"
            >
              {{ item[labelKey] }}
            </slot>
          </p>
          <slot
            name="actions"
            :item="item"
            :index="getIndex(index)"
            :active="isActive(item, index)"
          />
        </div>
      </div>
    </div>
    <div class="empty" v-else>
      <slot name="empty-state">
        <div class="flex flex-col items-center justify-center gap-lg">
          <iframe
            src="https://lottie.host/embed/078fe5c6-b2a9-4572-957c-14e8f116399a/xLE7X2WZK0.json"
            class="w-full h-[200px]"
          ></iframe>
          <h3 class="text-gray-500 font-bold text-16">Sem dados para exibir</h3>
        </div>
      </slot>
    </div>
    <div class="flex items-center justify-center w-full">
      <Pagination
        v-model="page"
        :pages="Math.ceil(items.length / itemsPerPage)"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "History",

  props: {
    modelValue: {
      type: Object,
      default: {},
    },
    items: {
      type: Array,
      default: () => [],
    },
    valueKey: {
      type: String,
      default: "value",
    },
    labelKey: {
      type: String,
      default: "label",
    },
    loading: Boolean,
    disabled: Boolean,
  },
  emits: ["update:modelValue"],

  setup() {
    const model = ref(null);
    const page = ref(1);
    const itemsPerPage = ref(10);

    return {
      model,
      page,
      itemsPerPage,
    };
  },

  computed: {
    pagedItems() {
      return this.items.slice(
        (this.page - 1) * this.itemsPerPage,
        this.page * this.itemsPerPage
      );
    },
  },

  watch: {
    modelValue() {
      this.model = this.modelValue || {};
    },
    items: {
      handler() {
        this.page = 1;
      },
      immediate: true,
      deep: true,
    },
  },

  created() {
    this.model = this.modelValue;
  },

  methods: {
    updateModel(item) {
      this.model = item;
      this.$emit("update:modelValue", item);
    },

    isActive(item, index) {
      return (
        (index == 0 &&
          this.page == 1 &&
          !this.model[this.valueKey] &&
          !this.disabled) ||
        item[this.valueKey] == this.model[this.valueKey]
      );
    },

    getIndex(index) {
      return (this.page - 1) * this.itemsPerPage + index;
    },
  },
};
</script>

<style scoped>
.history {
  @apply flex flex-col justify-between gap-lg w-full h-full;
}

.first-item {
  .custom-border {
    @apply top-[50%];
  }

  .circle {
    @apply z-[1];
  }
}

.last-item {
  .custom-border {
    @apply bottom-[50%];
  }
}

.item.first-item,
.item.last-item {
  .content {
    @apply border-none;
  }
}

.item.first-item.last-item {
  .custom-border {
    @apply hidden;
  }
}

.item {
  @apply w-full relative text-12 text-gray-400;
}

.item.disabled {
  @apply pointer-events-none hover:bg-transparent;
}

.item.active {
  @apply text-primary-500;

  .circle {
    @apply bg-primary-500;
  }
}

.content {
  @apply flex items-center justify-between gap-sm w-full border-l-gray-200 border-l-[1.5px] py-base pl-lg ml-[3.1px];

  .label {
    @apply cursor-pointer hover:underline;
  }
}

.circle {
  @apply bg-gray-400 absolute w-[8px] h-[8px] rounded-full top-[50%] translate-y-[-50%] z-[2];
}

.custom-border {
  @apply absolute bg-gray-200 h-[50%] w-[.5px] ml-[3.1px];
}
</style>
