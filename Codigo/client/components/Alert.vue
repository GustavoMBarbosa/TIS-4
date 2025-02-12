<script lang="ts">
export default {
    name: 'Alert',
    props: {
        message: String,
        toast: Boolean,
        type: {
            type: String,
            default: () => 'info'
        },
    },
    computed: {
        icon() {
            switch (this.type) {
                case 'error':
                    return 'error';
                case 'warning':
                    return 'warning';
                case 'success':
                    return 'check_circle';
                case 'info':
                    return 'info';
            }
        }
    },
}
</script>

<template>
    <div
        class="alert"
        :class="[type, { 'toast': toast }]"
    >
        <Icon :name="icon" />
        <p class="text-gray-500 font-bold text-12">
            <slot>{{ message }}</slot>
        </p>
    </div>
</template>

<style scoped lang="scss">
.alert {
    @apply flex items-center gap-2 gap-sm px-lg py-base border-1 whitespace-normal rounded-12;
}

.alert.toast {
    @apply border-t-0 border-b-0 border-l-0 border-r-3 rounded-r-none;
}

.icon {
    @apply text-24;
}

.error {
    @apply text-red-500 border-red-500 bg-red-100;
}

.warning {
    @apply text-yellow-500 border-yellow-500 bg-yellow-100;
}

.success {
    @apply text-green-500 border-green-500 bg-green-100;
}

.info {
    @apply text-blue-500 border-blue-500 bg-blue-100;
}
</style>