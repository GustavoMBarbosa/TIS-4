<script lang="ts">
export default {
	name: 'PacientId',

	props: {
		modelValue: {
			type: Object,
			default: () => ({}),
		},
	},

	setup() {
		const { signs } = usePacients();
		return { signs };
	},

	computed: {
		sexs() {
			return {
				F: 'Feminino',
				M: 'Masculino',
			};
		},
		bloods() {
			const bloods = ['A', 'B', 'AB', 'O'];
			return bloods.flatMap((blood) => [`${blood}+`, `${blood}-`]);
		},
		maritalStatus() {
			return {
				married: 'Casado',
				divorced: 'Divorcido',
				separated: 'Separado',
				single: 'Solteiro',
				widower: 'Viuvo',
			};
		},
	},
};
</script>

<template>
	<Card class="flex flex-col gap-lg p-xl">
		<div class="section">
			<Input
				v-model="modelValue.name"
				label="Nome Completo"
				required
			/>
			<Input
				v-model="modelValue.cpf"
				label="CPF"
				mask="cpf"
			/>
		</div>
		<div class="section">
			<DatePicker
				v-model="modelValue.birthDate"
				:max-date="new Date()"
				label="Nascimento"
			/>
			<ObjectSelect
				v-model="modelValue.biologicalSex"
				label="Sexo"
				:items="sexs"
			/>
			<Select
				v-model="modelValue.bloodType"
				label="Sangue"
				:items="bloods"
			/>
		</div>
		<div class="section">
			<ObjectSelect
				v-model="modelValue.maritalStatus"
				label="Estado Civil"
				searchable
				:items="maritalStatus"
			/>
			<ObjectSelect
				v-model="modelValue.sign"
				label="Signo"
				searchable
				:items="signs"
			/>
			<ObjectSelect
				v-model="modelValue.ascendant"
				label="Ascendente"
				searchable
				:items="signs"
			/>
		</div>
		<div class="section">
			<Input
				v-model="modelValue.birthPlace"
				label="Local de Nascimento"
			/>
			<Input
				v-model="modelValue.indication"
				label="Indicação"
			/>
		</div>
		<Address v-model="modelValue.address" />
	</Card>
</template>

<style scoped>
.section {
	@apply flex flex-wrap gap-sm [&>*]:flex-1;
}
</style>
