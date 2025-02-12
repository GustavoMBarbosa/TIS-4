<script lang="ts">
export default {
  name: "PacientAssessment",

  props: {
    modelValue: Object,
  },
};
</script>

<template>
  <Card class="flex flex-col gap-lg p-xl">
      <Input v-model="modelValue.diagnostic" label="Diagnóstico" text-area />
      <Input v-model="modelValue.conduct" label="Conduta" text-area />
    </Card>
</template>