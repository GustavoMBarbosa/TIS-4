<script lang="ts">
export default {
    name: 'PacientFamily',

    props: {
        modelValue: Object,
    },

    created() {
        if (!this.modelValue.family) this.modelValue.family = {};
    }
}
</script>

<template>
    <Card class="flex flex-col gap-lg p-xl">
        <div class="section">
            <Input v-model="modelValue.family.mother" label="Mãe" text-area />
            <Input v-model="modelValue.family.father" label="Pai" text-area />
        </div>
        <div class="section">
            <Input v-model="modelValue.family.siblings" label="Irmãos" text-area />
            <Input v-model="modelValue.family.children" label="Filhos" text-area />
        </div>
        <div class="section">
            <Input v-model="modelValue.family.partner" label="Cônjuge" text-area />
            <Input v-model="modelValue.family.birthOrder" label="Ordem de nascimento" text-area />
        </div>
    </Card>
</template>

<style scoped>
.section {
    @apply flex flex-wrap items-end gap-sm [&>*]:flex-1;
}
</style>