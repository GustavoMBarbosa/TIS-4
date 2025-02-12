<script lang="ts">
import event from "../util/event";

export default {
    name: 'Confirm',
    setup() {
        return {
            title: ref(''),
            description: ref(''),
            confirmText: ref('Confirmar'),
            cancelText: ref('Cancelar'),
            show: ref(false),
            onConfirm: () => {},
            onCancel: () => {},

        }
    },

    mounted() {
        event.on('open-confirm', this.openDialog);
    },

    methods: {
        handleConfirm() {
            this.show = false;
            event.emit('confirm');
        },

        handleCancel() {
            this.show = false;
            event.emit('cancel');
        },

        handleChange(value: boolean) {
            if (value) return;
            this.handleCancel();
        },

        openDialog(options: any) {
            Object.keys(options).forEach((key) => {
                // @ts-ignore
                this[key] = options[key];
            });

            this.show = true;
        },
    },

    beforeUnmount() {
        event.off('open-confirm', this.openDialog);
    },
}
</script>

<template>
    <Dialog v-model="show" @update:model-value="handleChange">
        <div class="flex flex-col gap-lg text-gray-500">
            <div class="flex flex-col gap-sm">
                <h1 class="text-16 font-bold confirm-text">{{ title }}</h1>
                <p class="text-12 confirm-text">{{ description }}</p>
            </div>
            <div class="flex flex-wrap justify-end gap-sm">
                <Button secondary @click="handleCancel">{{ cancelText }}</Button>
                <Button @click="handleConfirm">{{ confirmText }}</Button>
            </div>
        </div>
    </Dialog>
</template>

<style scoped>
.confirm-text {
    @apply whitespace-normal break-words;
}
</style>