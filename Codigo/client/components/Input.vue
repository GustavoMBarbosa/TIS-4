<script lang="ts">
import { isEmailValid, applyMask } from "~/util/index";

export default {
	name: 'Input',
	props: {
		modelValue: [String, Number],
		type: {
			type: String,
			default: 'text',
		},
		label: String,
		icon: String,
		placeholder: String,
		errorMessage: String,
		disabled: Boolean,
		isError: Boolean,
		textArea: Boolean,
		required: Boolean,
		mask: {
			type: String,
			required: false,
		},
	},
	emits: ['update:modelValue', 'blur'],
	setup() {
		return {
			hidePass: ref(true),
			onFocus: ref(false),
			error: ref(false),
			model: ref(),
		};
	},

	computed: {
		parsedType() {
			if ((this.type === 'password' && !this.hidePass) || this.type === 'email' || this.type === 'search')
				return 'text';
			return this.type;
		},

		rightIcon() {
			if (this.type == 'password') {
				if (this.hidePass) return 'visibility_off';
				return 'visibility';
			} else if (this.type == 'search' && this.onFocus) return 'close';
		},

		parsedErrorMessage() {
			if (this.errorMessage) return this.errorMessage;
			else if (this.type == 'email') return 'E-mail inválido';
			return 'Campo inválido';
		},
	},

	created() {
		this.model = this.modelValue;
	},

	watch: {
		modelValue() {
			this.model = this.modelValue;
		},
	},

	methods: {
		isEmail() {
			this.error = !isEmailValid(this.model);
		},
		resetModel() {
			this.model = '';
			this.$emit('update:modelValue', this.model);
		},
		focusout() {
			if (this.mask == 'time') {
				const digits = this.model.split(':');
				let hours = digits[0];
				let minutes = digits[1];
				if (hours && hours.length < 2) hours = `0${hours}`;

				if (minutes && minutes.length < 2) minutes = `0${minutes}`;

				const formattedTime = `${hours}${minutes ? `:${minutes}` : ''}`;
				this.model = formattedTime;
			}
			setTimeout(() => {
				this.onFocus = false;
			}, 300);
		},
		changeModel() {
			if (this.type == 'email') this.isEmail();
			if (this.mask) {
				this.model = applyMask(this.model, this.mask);
			}

			if (this.mask == 'time') {
				const digits = this.model.split(':');
				let hours = digits[0];
				let minutes = digits[1];
				if (hours && Number(hours) > 23) hours = '23';

				if (minutes && Number(minutes) > 59) minutes = '59';

				const formattedTime = `${hours}${minutes ? `:${minutes}` : ''}`;
				this.model = formattedTime;
			}
			this.$emit('update:modelValue', this.model);
		},
		rightIconClick() {
			if (this.type == 'password') this.hidePass = !this.hidePass;
			else if (this.type == 'search') this.resetModel();
		},
	},
};
</script>

<template>
	<div class="holder">
		<label
			v-if="label"
			class="label"
			>{{ label }}
			<span v-if="required" class="text-primary-500">*</span></label
		>
		<div
			tabindex="0"
			class="input-holder"
			:class="{
				disabled: disabled,
				error: isError || error,
				'on-focus': onFocus,
			}"
			v-if="!textArea"
		>
			<Icon
				v-if="type == 'search' || icon"
				:name="type == 'search' ? 'search' : icon"
				class="icon"
			/>
			<input
				class="input flex-1"
				:class="[type]"
				v-model="model"
				:placeholder="placeholder"
				:disabled="disabled"
				:type="parsedType"
				:value="model"
				@focusin="onFocus = true"
				@focusout="focusout"
				@input="changeModel"
				@blur="$emit('blur')"
			/>
			<Icon
				v-if="rightIcon"
				:name="rightIcon"
				class="clickable icon"
				@click="rightIconClick"
			/>
		</div>
		<textarea
			v-else
			class="input text-area"
			:class="{ disabled: disabled, error: isError }"
			:placeholder="placeholder"
			:disabled="disabled"
			v-model="model"
			@input="changeModel"
			@blur="$emit('blur')"
		/>
		<div
			v-if="isError || error"
			class="error-message"
		>
			{{ parsedErrorMessage }}
		</div>
	</div>
</template>

<style scoped>
.holder {
	@apply flex flex-col gap-xs;
}

.label {
	@apply text-12 text-gray-500 font-bold;
}

.input-holder {
	@apply flex items-center gap-xs bg-white rounded-8 border-1 border-gray-300 py-xxs px-base;

	input {
		@apply bg-transparent;
	}
}

.input-holder.on-focus {
	@apply border-primary-500;

	.icon {
		@apply text-primary-500;
	}
}

.input-holder.disabled,
.input-holder.on-focus.disabled,
.input-holder.error.disabled,
.text-area.disabled,
.text-area.on-focus.disabled,
.text-area.error.disabled {
	@apply pointer-events-none text-gray-400 bg-gray-200 border-gray-300;
}

.input-holder.error,
.input-holder.on-focus.error {
	@apply text-red-500 border-red-500 bg-red-100;
}

.input {
	@apply p-0 text-12 text-gray-500 border-none shadow-none outline-none placeholder:text-gray-400;
	--tw-ring-shadow: none;
	--tw-ring-shadow: transparent;
	--tw-ring-color: transparent;
}

.text-area.input {
	@apply h-full border-1 border-gray-300 border-solid rounded-8 py-xxs px-base focus:border-primary-500;
}

.icon {
	@apply text-gray-400 text-16;
}

.clickable {
	@apply cursor-pointer;
}

.error-message {
	@apply text-10 text-red-500;
}
</style>
