<script lang="ts">
export default {
  name: "Pagination",

  props: {
    modelValue: {
      type: Number,
      default: 1,
    },
    itemsPerPage: {
      type: Number,
      default: 10,
    },
    pages: {
      type: Number,
      default: 0,
    },
  },
  emits: ["update:modelValue", "update:itemsPerPage"],

  setup() {
    return {
      page: ref(1),
      items: ref(10),
    };
  },

  computed: {
    itemsPerPageOptions() {
      return [10, 20, 30, 40, 50];
    },
  },

  created() {
    this.page = this.modelValue;
    this.items = this.itemsPerPage;
  },

  watch: {
    modelValue(newVal) {
      this.page = newVal;
    },
    itemsPerPage(newVal) {
      this.items = newVal;
    },
  },

  methods: {
    changePage(page) {
      this.$emit("update:modelValue", page);
    },

    changeItemsPerPage(value) {
      this.$emit("update:itemsPerPage", value);
    },
  },
};
</script>

<template>
  <div class="flex items-center justify-between flex-wrap gap-lg">
    <Pagination
      v-model="page"
      :pages="pages"
      @update:model-value="changePage"
    />
    <div class="flex items-center gap-sm">
      <span class="text-12 text-gray-500">Itens por página</span>
      <Select
        v-model="items"
        :items="itemsPerPageOptions"
        @update:model-value="changeItemsPerPage"
      />
    </div>
  </div>
</template>
