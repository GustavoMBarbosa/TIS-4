<script lang="ts">
import { getAddress, getUfs } from '../server/address';

export default {
	name: 'Address',
	props: {
		modelValue: {
			type: Object,
			default: {},
		},
	},
	emits: ['update:modelValue'],

	setup() {
		const loading = ref(false);
		const isSearched = ref(false);
		const status = ref('');
		const ufs = ref([]);

		return {
			loading,
			isSearched,
			status,
			ufs,
		};
	},

	computed: {
		type() {
			if (!!this.status) return this.status;
			return 'primary';
		},
		icon() {
			if (this.status == 'success') return 'check';
			return 'close';
		},
	},

	watch: {
		modelValue: {
			handler(newVal) {
				this.$emit('update:modelValue', newVal);
			},
			deep: true,
		},
	},

	async created() {
		const ufs = await getUfs();
		this.ufs = ufs.map((uf) => uf.sigla);
	},

	methods: {
		async searchCep() {
			this.loading = true;
			try {
				const data = await getAddress(this.modelValue.cep.replace(/\D/g, ''));
				this.status = data.erro ? 'error' : 'success';
				if (!data.erro) {
					this.isSearched = true;
					this.modelValue.uf = data.uf;
					this.modelValue.city = data.localidade;
					this.modelValue.neighborhood = data.bairro;
					this.modelValue.street = data.logradouro;
					this.modelValue.number = data.numero;
					this.modelValue.complement = data.complemento;
				}
			} catch {
				this.status = 'error';
			}

			this.loading = false;
			setTimeout(() => {
				this.status = '';
			}, 4000);
		},
	},
};
</script>

<template>
	<div class="flex flex-col gap-lg w-full">
		<Divider position="right">
			<h2 class="text-14 font-bold text-gray-500">Endereço</h2>
		</Divider>
		<div class="data-holder fit">
			<Input
				v-model="modelValue.cep"
				label="CEP"
				class="min-w-[30%]"
				mask="cep"
			/>
			<Button
				size="small"
				:loading="loading"
				:type="type"
				@click="searchCep"
			>
				<div class="relative flex items-center">
					<span :class="{ invisible: status }">Buscar</span>
					<Icon
						v-if="status"
						class="absolute text-14"
						:name="icon"
					/>
				</div>
			</Button>
		</div>
		<div class="data-holder">
			<Select
				v-model="modelValue.uf"
				label="UF"
				:items="ufs"
				searchable
				:disabled="isSearched"
			/>
			<Input
				v-model="modelValue.city"
				label="Cidade"
				:disabled="isSearched"
			/>
		</div>
		<div class="data-holder">
			<Input
				v-model="modelValue.street"
				label="Logadouro"
				:disabled="isSearched"
			/>
			<Input
				v-model="modelValue.neighborhood"
				label="Bairro"
				:disabled="isSearched"
			/>
		</div>
		<div class="data-holder">
			<Input
				v-model="modelValue.number"
				label="Número"
			/>
			<Input
				v-model="modelValue.complement"
				label="Complemento"
			/>
		</div>
	</div>
</template>

<style scoped>
.data-holder {
	@apply flex items-end flex-wrap gap-sm [&>*]:flex-1;
}

.data-holder.fit {
	@apply [&>*]:flex-none;
}
</style>
