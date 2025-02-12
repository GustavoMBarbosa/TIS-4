<script lang="ts">
export default {
  name: "Select",
  props: {
    modelValue: [Object, String, Number],
    items: Array,
    icon: String,
    expanded: Boolean,
    searchable: Boolean,
    label: String,
    labelKey: {
      type: String,
      default: "label",
    },
    required: Boolean,
    disabled: Boolean,
  },
  emits: ["update:modelValue", "update:expanded"],
  setup() {
    return {
      isExpanded: ref(),
      model: ref(),
      search: ref(""),
    };
  },

  computed: {
    parsedItems() {
      if (!this.search || !this.searchable) return this.items;

      return this.items?.filter((value: any) => {
        if (
          typeof value == "object"
        ) {
          if (value[this.labelKey].toLowerCase().includes(this.search.toLowerCase())) return value;
        } else if (value.toLowerCase().includes(this.search.toLowerCase()))
          return value;
      });
    },
    selected() {
      if (!this.model) return;
      else if (typeof this.model == "object") return this.model[this.labelKey];
      return this.model;
    },
  },

  created() {
    this.model = this.modelValue;
    this.isExpanded = this.expanded;
  },

  watch: {
    modelValue() {
      this.model = this.modelValue;
    },
    expanded() {
      this.isExpanded = this.expanded;
    },
  },

  methods: {
    changeExpanded(value: boolean) {
      this.isExpanded = value;
      this.$emit("update:expanded", this.isExpanded);
    },

    changeModel(value: any) {
      this.model = value;
      this.changeExpanded(false);
      this.$emit("update:modelValue", this.model);
    },
  },
};
</script>

<template>
  <SelectContainer
    v-model="isExpanded"
    @update:model-value="changeExpanded"
    :label="label"
    :icon="icon"
    :searchable="searchable"
    :disabled="disabled"
    :required="required"
  >
    <SelectContent
      v-model="search"
      v-model:expanded="isExpanded"
      :searchable="searchable"
      :disabled="disabled"
      @update:expanded="changeExpanded"
    >
      <p v-if="selected" class="status-text">
        <slot name="status">
          {{ selected }}
        </slot>
      </p>
      <p class="text-12 text-gray-400" v-else>
        <slot>Selecionar</slot>
      </p>
    </SelectContent>
    <template #items>
      <div class="items-holder">
        <div
          v-for="(item, index) in parsedItems"
          :key="index"
          class="item"
          :class="{ active: item == model }"
          @click="changeModel(item)"
        >
          <slot name="item" :item="item" :index="index">
            {{
              // @ts-ignore
              item[labelKey] ? item[labelKey] : item
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
  @apply w-full flex justify-center items-center cursor-pointer text-center text-gray-500 text-12 p-xs hover:bg-primary-100 hover:text-primary-500;
}

.item.active {
  @apply bg-primary-100 text-primary-500;
}

.status-text {
  @apply text-12 text-gray-500;
}
</style>
