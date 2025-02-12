<script lang="ts">
export default {
    name: 'Tag',
    props: {
        text: String,
        type: {
            type: String,
            default: () => 'primary'
        },
    },
    computed: {
        icon() {
            if (this.type == 'success') return 'check'
            else if (this.type == 'error') return 'close';
        }
    }
}
</script>

<template>
    <div class="tag" :class="type">
        <Icon :name="icon" v-if="icon" />
        <template v-else-if="text">{{ text }}</template>
        <slot v-else />
    </div>
</template>

<style scoped>
.tag {
    @apply p-sm rounded-full text-center font-bold w-fit flex justify-center text-12;
}

.tag.primary {
    @apply text-primary-500 bg-primary-100 px-lg;
}

.tag.success {
    @apply text-green-500 bg-green-100;
}

.tag.error {
    @apply text-red-500 bg-red-100;
}

.icon {
    @apply text-16;
}
</style>