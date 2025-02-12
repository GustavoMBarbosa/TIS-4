<script lang="ts">
import { formatDate } from "~/util";

export default {
  name: "DatePicker",
  props: {
    modelValue: [Array, Date],
    maxDate: Date,
    minDate: Date,
    isCompare: Boolean,
    expanded: Boolean,
    label: String,
    disabled: Boolean,
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

  computed: {
    status() {
      const template = { year: "numeric", month: "2-digit", day: "2-digit" };
      if (this.isCompare && this.model[0]) {
        return (
          formatDate(new Date(this.model[0]), template) +
          (this.model[1]
            ? `-${formatDate(new Date(this.model[1]), template)}`
            : "")
        );
      } else if (!this.isCompare && this.model) {
        return formatDate(new Date(this.model), template);
      }
      return "";
    },
  },

  methods: {
    changeExpanded(value: boolean) {
      this.isExpanded = value;
      this.$emit("update:expanded", this.isExpanded);
    },

    changeModel(value: Date[] | Date) {
      this.model = value;
      this.$emit("update:modelValue", this.model);
    },

    resetDate() {
      if (this.isCompare) {
        this.changeModel([]);
      } else {
        this.changeModel(null);
      }
    },
  },
};
</script>

<template>
  <SelectContainer
    v-model="isExpanded"
    :label="label"
    :disabled="disabled"
    icon="calendar_month"
    class="w-[263px]"
    style="max-width: 263px; min-width: 263px"
    @update:model-value="changeExpanded"
  >
    <p class="text-12 text-gray-500">
      <template v-if="status">{{ status }}</template>
      <slot v-else />
    </p>

    <template #items>
      <Date
        v-model="model"
        :is-compare="isCompare"
        :min-date="minDate"
        :max-date="maxDate"
        @update:model-value="changeModel"
        class="px-xl py-lg"
      />
      <div class="actions">
        <a @click="resetDate">Limpar</a>
      </div>
    </template>
  </SelectContainer>
</template>

<style scoped>
.actions {
  @apply flex justify-end border-t-1 border-gray-100 p-base cursor-pointer;

  a,
  a:visited {
    @apply text-12 text-primary-500 hover:underline;
  }
}
</style>
