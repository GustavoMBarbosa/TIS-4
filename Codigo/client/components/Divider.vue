<script lang="ts">
export default {
    name: 'Divider',
    props: {
        position: {
            type: String,
            default: () => 'right'
        },
        vertical: Boolean
    }
}
</script>

<template>
    <div class="flex items-center gap-xs w-full" :class="{ 'vertical': vertical }">
        <div class="divider" v-if="position != 'right'" />
        <slot />
        <div class="divider" v-if="position != 'left'" />
    </div>
</template>

<style scoped>
.divider {
    @apply h-[1px] flex-1 bg-gray-300;
}

.vertical {
    @apply h-full w-fit flex-col;
    
    .divider {
        height: none;
        @apply w-[1px] flex-1 bg-gray-300;
    }
}
</style>