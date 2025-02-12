<script lang="ts">
export default {
    name: 'Tab',
    props: {
        modelValue: Number,
        items: {
            type: Array,
            default: [],
        },
        disabled: Boolean,
    },
    emits: ['update:modelValue'],
    setup() {
        return {
            model: ref(0),
        }
    },

    created() {
        this.model = this.modelValue || 0;
    },

    watch: {
        modelValue() {
            this.model = this.modelValue;
        }
    },

    methods: {
        changeTab(index: number) {
            this.model = index;
            this.$emit('update:modelValue', this.model);
        }
    }
}
</script>

<template>
    <div class="tab-holder">
        <div
            v-for="(item, index) in items"
            class="tab"
            :class="{'active': index === model, 'disabled': disabled}"
            @click="changeTab(index)"
        >
            {{ item.text ? item.text : item }}
        </div>
    </div>
</template>

<style scoped>
.tab-holder {
    @apply flex flex-wrap py-sm px-base gap-xs bg-white shadow-normal rounded-12 max-w-full;
}

.tab {
    @apply flex items-center justify-center gap-xs px-base py-xs rounded-8 cursor-pointer text-gray-400 text-12 hover:bg-gray-100 hover:text-gray-500;
}

.tab.active {
    @apply text-primary-500 bg-primary-100 font-bold hover:text-primary-500 hover:bg-primary-100;
}

.tab.disabled, .tab.active.disabled {
    @apply pointer-events-none text-gray-300 font-normal;
}
</style>