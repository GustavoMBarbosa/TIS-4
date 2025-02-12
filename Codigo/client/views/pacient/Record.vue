<script lang="ts">
export default {
    name: 'PacientRecord',

    props: {
        modelValue: Object,
    },

    created() {
        if (!this.modelValue.record) this.modelValue.record = {};
        if (!this.modelValue.record.habits) this.modelValue.record.habits = {};
    }
}
</script>

<template>
    <Card class="flex flex-col gap-lg p-xl">
        <Input v-model="modelValue.record.diagnosis" label="Diagnósticos Recentes" text-area />
        <Input v-model="modelValue.record.medication" label="Medicações" text-area />
        <div class="section">
            <Input v-model="modelValue.record.selfSteem" label="Auto-estima" text-area />

            <Input v-model="modelValue.record.allergy" label="Alergia" text-area />
        </div>
        <div class="section">
            <Input v-model="modelValue.record.religion" label="Atv. Religiosa" text-area />
            <Input v-model="modelValue.record.social" label="Convívio Social" text-area />
        </div>
        <Divider>
            <h2 class="text-14 font-bold text-gray-500">Hábitos</h2>
        </Divider>
        <div class="section">
            <Input v-model="modelValue.record.habits.exercises" label="Exercícios" text-area />
            <Input v-model="modelValue.record.habits.alimentation" label="Alimentação" text-area />
        </div>
        <div class="section">
            <Input v-model="modelValue.record.habits.intestinalHabit" label="Hábito Intestinal" text-area />
            <Input v-model="modelValue.record.habits.sexualActivity" label="Atv. Sexual" text-area />
        </div>
        <div class="section">
            <Input v-model="modelValue.record.habits.drugs" label="Drogas" text-area />
            <Input v-model="modelValue.record.habits.alcohol" label="Bebidas" text-area />
        </div>
        <div class="section">
            <Input v-model="modelValue.record.habits.smoking" label="Fuma" text-area />
            <Input v-model="modelValue.record.habits.digestion" label="Digestão" text-area />
        </div>
        <div class="section">
            <Input v-model="modelValue.record.habits.sleep" label="Sono" text-area />
            <Input v-if="modelValue.biologicalSex == 'F'" v-model="modelValue.record.habits.mestrual" label="Ciclo Mestrual" text-area />
        </div>
    </Card>
</template>

<style scoped>
.section {
    @apply flex flex-wrap items-end gap-sm [&>*]:flex-1;
}
</style>