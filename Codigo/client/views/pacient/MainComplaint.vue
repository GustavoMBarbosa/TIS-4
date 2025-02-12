<script lang="ts">
export default {
	name: 'PacientMainComplaint',

	props: {
		modelValue: {
			type: Object,
			default: () => ({}),
		},
	},
};
</script>

<template>
	<Card class="p-xl">
		<Input
			v-model="modelValue.mainComplaint"
			label="Queixa Principal"
			text-area
		/>
	</Card>
</template>
