<script lang="ts">
import Form from '~/views/pacient/Form.vue';

export default {
	name: 'EditPacient',

	components: {
		Form,
	},

	setup() {
		const pacient = ref<Pacient>();
		const loading = ref(false);

		return {
			pacient,
			loading,
			...usePacients(),
			...useEvents(),
		};
	},

	async created() {
		this.loading = true;
		this.pacient = await this.getPacient(this.$route.params.id);
		this.loading = false;
	},
};
</script>

<template>
	<Form v-model="pacient" :getting-user="loading" />
</template>
