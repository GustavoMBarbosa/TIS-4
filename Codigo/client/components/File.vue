<script lang="ts">
export default {
    name: 'File',
    props: {
        modelValue: Object,
    },
    emits: ['update:modelValue'],
    setup() {
        return {
            dragging: ref(false),
            model: ref(),
        }
    },

    created() {
        this.model = this.modelValue;
    },

    watch: {
        modelValue() {
            this.model = this.modelValue
        }
    },

    methods: {
        changeModel(value: File | undefined) {
            this.model = value;
            this.$emit('update:modelValue', this.model);
        },
        onChangeFile(e: any) {
            const files = e.target.files || e.dataTransfer.files;
            const file = files[0];
            this.dragging = false;
            this.changeModel(file);
        },
    }
}
</script>

<template>
    <div
        class="holder"
        :class="{'blur-[2px]': dragging && !model}"
        @dragenter="dragging = true"
        @dragleave="dragging = false"
        @drag="onChangeFile"
    >
        <div class="flex flex-col items-center gap-xs" v-if="!model">
            <Icon class="icon" name="cloud_upload" />
            <p>Arreste e solte o arquivo aqui</p>
            <Divider position="both">ou</Divider>
            <Button>Selecione</Button>
        </div>
        <div class="flex items-center" v-else>
            <div>
                <Icon class="delete-icon" name="delete" @click="changeModel(undefined)" />
            </div>
            <p class="truncate">{{ model.name }}</p>
        </div>
        <input
            v-if="!model"
            type="file"
            class="w-full h-full top-0 left-0 right-0 bottom-0 absolute opacity-0 z-[1] cursor-pointer"
            @change="onChangeFile" 
        />
    </div>
</template>

<style scoped>
.holder {
    @apply relative flex flex-col items-center gap-xs p-xl rounded-8 border-1 border-gray-300 border-dashed text-gray-500 text-12;
}

.icon {
    @apply text-gray-400 text-[60px];
}

.delete-icon {
    @apply cursor-pointer;

    &:hover {
        @apply text-red-500;
    }
}
</style>