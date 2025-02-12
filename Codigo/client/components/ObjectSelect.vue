<script lang="ts">
export default {
  name: "ObjectSelect",
  props: {
    modelValue: [Object, String, Number],
    items: Object,
    icon: String,
    expanded: Boolean,
    searchable: Boolean,
    label: String,
    disabled: Boolean,
    required: Boolean,
  },
  emits: ["update:modelValue", "update:expanded"],
  setup() {
    return {
      isExpanded: ref(),
      model: ref(),
    };
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
  <Select
    v-model="model"
    v-model:expanded="isExpanded"
    :label="label"
    :icon="icon"
    :items="Object.keys(items)"
    :searchable="searchable"
    :required="required"
    :disabled="disabled"
    @update:model-value="changeModel"
    @update:expanded="changeExpanded"
  >
    <template #status>
      {{ items[model] }}
    </template>
    <template #item="{ item }">
      {{ items[item] }}
    </template>
  </Select>
</template>
