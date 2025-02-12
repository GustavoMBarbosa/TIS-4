<script lang="ts">
export default {
    name: 'Pagination',

    props: {
        modelValue: {
            type: Number,
            default: 1,
        },
        pages: {
            type: Number,
            default: 0,
        },
    },
    emits: ["update:modelValue"],

    methods: {
        changePage(page, disabled) {
            if (disabled) return
            this.$emit('update:modelValue', page)
        },
        shouldShowPage(page) {
            return (
                page === 1 ||
                page === this.pages ||
                Math.abs(page - this.modelValue) <= 1 ||
                (this.modelValue === 1 && page < 4) ||
                (this.modelValue === this.pages && page > this.pages - 3)
            )
        },
    },
}
</script>

<template>
    <div class="flex items-center gap-xs">
        <Icon name="chevron_left" class="page-icon" :class="{ disabled: modelValue == 1 }" @click="changePage(modelValue - 1, modelValue == 1)" />
        <template v-for="page in pages" :key="page">
            <div v-if="shouldShowPage(page)" class="flex items-center gap-xs">
                <div class="text-12 text-gray-500" v-if="modelValue <= pages - 2 && page === pages && pages > 3">...</div>
                <div @click="changePage(page)" class="page-number" :class="{ active: page == modelValue }">
                    {{ page }}
                </div>
                <div class="text-12 text-gray-500" v-if="modelValue > 2 && pages > 3 && page == 1">...</div>
            </div>
        </template>
        <Icon name="chevron_right" class="page-icon" :class="{ disabled: modelValue == pages || !pages }" @click="changePage(modelValue + 1, modelValue == pages)" />
    </div>
</template>

<style scoped>
.page-icon {
    @apply text-18 text-primary-500 rounded-full cursor-pointer h-fit;
}

.page-icon:hover {
    @apply bg-primary-100;
}

.page-icon.disabled {
    @apply pointer-events-none text-gray-300;
}

.page-number {
    @apply cursor-pointer px-xs text-12 rounded-2 text-gray-500;
}

.page-number:hover, .page-number.active {
    @apply bg-primary-500 text-white;
}
</style>