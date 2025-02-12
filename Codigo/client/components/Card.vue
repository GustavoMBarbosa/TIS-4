<script lang="ts">
export default {
    name: 'Card',
}
</script>

<template>
    <div class="card">
        <slot />
    </div>
</template>

<style scoped>
.card {
    @apply bg-white shadow-normal rounded-16 p-xl;
}
</style>