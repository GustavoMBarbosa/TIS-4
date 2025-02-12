<script lang="ts">
export default {
	name: 'Dialog',
	props: {
		modelValue: Boolean,
		width: {
			type: String,
			default: 'fit-content',
		},
		height: {
			type: String,
			default: 'fit-content',
		},
		noOverflow: {
			type: Boolean,
			default: false,
		},
		overflowHidden: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['update:modelValue'],
	setup() {
		return {
			model: ref(false),
			dialogBg: ref(),
			dialog: ref(),
		};
	},
	watch: {
		modelValue() {
			this.model = this.modelValue;
		},
	},
	beforeMount() {
		this.model = this.modelValue;
		document.addEventListener('click', this.closeDialog);
	},
	beforeUnmount() {
		document.removeEventListener('click', this.closeDialog);
	},
	methods: {
		closeDialog(event: MouseEvent) {
			if (!this.dialogBg || !this.dialog || this.disabled) return;
			if (this.dialogBg.contains(event.target) && !this.dialog.contains(event.target)) {
				this.model = false;
				this.$emit('update:modelValue', this.model);
			}
		},
	},
};
</script>

<template>
	<Transition name="bounce">
		<div ref="dialogBg" class="dialog-bg" v-if="model">
			<div
				ref="dialog"
				class="dialog"
				:class="{ 'overflow-auto': !noOverflow, 'overflow-hidden': overflowHidden }"
				:style="{ width: width, height: height }"
			>
				<slot />
			</div>
		</div>
	</Transition>
</template>

<style scoped>
.dialog-bg {
	@apply z-[80] fixed inset-0 flex items-center justify-center w-full h-screen bg-gray-500/60 p-xl;
}

.dialog {
    @apply bg-white shadow-normal rounded-16 p-xl;
}

.bounce-enter-active,
.bounce-leave-active {
  transition: all 0.5s ease;
}

.bounce-enter-from,
.bounce-leave-to {
  opacity: 0;
  transform: scale(0);
}

.bounce-enter-to,
.bounce-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
