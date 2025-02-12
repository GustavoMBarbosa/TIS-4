<script lang="ts">
export default {
  name: "PacientFisicalExam",

  props: {
    modelValue: Object,
  },
};
</script>

<template>
  <Card class="flex flex-col gap-lg p-xl">
        <div class="section">
            <Input v-model="modelValue.fisical_exam.height" label="Altura" text-area />
            <Input v-model="modelValue.fisical_exam.weight" label="Peso" text-area />
        </div>
        <div class="section">
            <Input v-model="modelValue.fisical_exam.bloodPressure" label="Pressão Arterial" text-area />
            <Input v-model="modelValue.fisical_exam.heartRate" label="Frequência Cardíaca" text-area />
        </div>
        <div class="section">
            <Input v-model="modelValue.fisical_exam.svc" label="Sem Comprometimento Ventilatório" text-area />
            <Input v-model="modelValue.fisical_exam.heartRateRegular" label="Ritmo Cardíaco Regular" text-area />
        </div>
        <div class="section">
            <Input v-model="modelValue.fisical_exam.respiratoryRate" label="Frequência Respiratória" text-area />
            <Input v-model="modelValue.fisical_exam.temperature" label="Temperatura" text-area />
        </div>
        <div class="section">
            <Input v-model="modelValue.fisical_exam.heartRateRegular" label="Ritmo Cardíaco Regular" text-area />
            <Input v-model="modelValue.fisical_exam.respiratoryRate" label="Frequência Respiratória" text-area />
        </div>
        <div class="section">
            <Input v-model="modelValue.fisical_exam.sr" label="Sem Ruídos" text-area />
            <Input v-model="modelValue.fisical_exam.observations" label="Observações" text-area />
        </div>
    </Card>
</template>

<style scoped>
.section {
    @apply flex flex-wrap items-end gap-sm [&>*]:flex-1;
}
</style>