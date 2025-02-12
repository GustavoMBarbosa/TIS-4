<script lang="ts">
export default {
  name: "MultiSelect",
  props: {
    modelValue: Array,
    icon: String,
    expanded: Boolean,
    searchable: Boolean,
    label: String,
    labelKey: {
      type: String,
      default: "label",
    },
    disabled: Boolean,
  },
  emits: ["update:modelValue", "update:expanded"],

  setup() {
    return {
      isExpanded: ref(false),
      search: ref(""),
    };
  },

  computed: {
    selections() {
      return this.modelValue?.filter((item: any) => item.selected)?.length;
    },

    parsedItems() {
      if (!this.search || !this.searchable) return this.modelValue;

      return this.modelValue?.filter((value: any) => {
        if (
          value[this.labelKey].toLowerCase().includes(this.search.toLowerCase())
        ) {
          return value;
        }
      });
    },
  },

  created() {
    this.isExpanded = this.expanded;
  },

  watch: {
    expanded() {
      this.isExpanded = this.expanded;
    },
  },

  methods: {
    changeModel(item: any) {
      item.selected = !item.selected;
      this.$emit("update:modelValue", this.modelValue);
    },
    changeExpanded(value: boolean) {
      this.isExpanded = value;
      this.$emit("update:expanded", this.isExpanded);
    },
  },
};
</script>

<template>
  <SelectContainer
    v-model="isExpanded"
    :label="label"
    :icon="icon"
    :disabled="disabled"
    :searchable="searchable"
    @update:model-value="changeExpanded"
  >
    <SelectContent
      v-model="search"
      v-model:expanded="isExpanded"
      :searchable="searchable"
      :disabled="disabled"
      @update:expanded="changeExpanded"
    >
      <div class="flex gap-xs text-gray-500 text-12" v-if="selections">
        <span class="font-bold">Selecionados</span>
        <span
          class="flex items-center justify-center rounded-full px-sm"
          :class="{
            'text-white bg-primary-500': isExpanded,
            ' bg-gray-100': !isExpanded,
          }"
          >{{ selections }}</span
        >
      </div>
      <p class="text-12 text-gray-400" v-else>
        <slot>Selecionar</slot>
      </p>
    </SelectContent>
    <template #items>
      <div role="list" class="items-holder">
        <div
          v-for="(item, index) in parsedItems"
          role="option"
          :aria-selected="
            // @ts-ignore
            item.selected
          "
          :key="index"
          class="item"
          :class="{
            // @ts-ignore
            active: item.selected,
          }"
          @click="changeModel(item)"
        >
          <Checkbox
            v-model="
              // @ts-ignore
              item.selected
            "
            class="pointer-events-none"
          />
          <slot name="item" :item="item" :index="index">
            {{
              // @ts-ignore
              item[labelKey]
            }}
          </slot>
        </div>
      </div>
    </template>
  </SelectContainer>
</template>

<style scoped>
.items-holder {
  @apply flex flex-col max-h-[10em] overflow-auto divide-y-1 divide-gray-100;
}

.item {
  @apply w-full flex justify-center items-center gap-xxs cursor-pointer text-center text-gray-500 text-12 p-xs hover:bg-primary-100 hover:text-primary-500;
}

.status-text {
  @apply text-16 text-gray-500;
}
</style>
