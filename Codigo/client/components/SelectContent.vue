<script lang="ts">
export default {
    name: 'SelectContent',
    props: {
        modelValue: String,
        icon: String,
        expanded: Boolean,
        searchable: Boolean,
        disabled: Boolean,
    },
    emits: ['update:modelValue', 'update:expanded'],
    setup() {
        return {
            isExpanded: ref(),
            model: ref(),
        }
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
        }
    },

    methods: {
        changeExpanded(value: boolean) {
            this.isExpanded = value;
            this.$emit('update:expanded', this.isExpanded);
        },

        changeModel() {
            this.$emit('update:modelValue', this.model);
        },
    }
}
</script>

<template>
  <input
      v-if="searchable && isExpanded"
      v-model="model"
      type="search"
      class="search"
      placeholder="Pesquisar"
      :disabled="disabled"
      @input="changeModel"
      @click="changeExpanded(true)"
  />
  <slot v-else />
</template>

<style scoped>
.icon {
  @apply text-16 shrink-0;
}

.search {
    @apply w-full p-0 border-none shadow-none outline-none text-12 text-gray-500;
}

.search::placeholder {
    @apply text-gray-400;
}
</style>