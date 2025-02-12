<template>
	<Template title="Lista de Doenças">
		<div class="flex flex-col gap-2xl">
			<Input
				v-model="searchQuery"
				type="search"
          		class="w-[500px] max-w-full"
				placeholder="Pesquisar doença"
			/>
			<Table
				:headers="headers"
				:items="cids"
				:options="options"
			>
				<template v-for="header in headers" v-slot:[header.value]="{ item }">
					<td class="text-gray-500 text-12">{{ item[header.value] }}</td>
				</template>
			</Table>
		</div>
	</Template>
</template>
<script lang="ts">
import cids from '~/assets/cid10.json';

export default {
	name: 'Diseases',
	setup() {
		const searchQuery = ref('');
		const options = ref({ sortBy: 'name' });

		return {
			searchQuery,
			options,
		};
	},

	computed: {
		cids() {
			if (!this.searchQuery) return cids;
			return cids.filter((cid) => cid.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
		},
		headers() {
			return [
				{ text: 'Código', value: 'code', sortable: true },
				{ text: 'Nome', value: 'name', sortable: true },
			];
		},
	},
};
</script>
