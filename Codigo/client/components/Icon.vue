<script>
export default {
    name: 'Icon',
    props: {
        name: String,
    },
}
</script>

<template>
    <span class="material-symbols-rounded icon">
        {{ name }}
    </span>
</template>

<style scoped>
.material-symbols-rounded {
    user-select: none;
    font-variation-settings:
        'FILL' 1,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
}

</style>