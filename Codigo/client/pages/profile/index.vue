<script lang="ts">
import { storeToRefs } from 'pinia'
import { authStore } from "~/stores/auth";
import { getInitials } from '~/util';

export default {
	name: 'Profile',

	setup() {
		const auth = storeToRefs(authStore());
		const saving = ref(false);
		const savingPassword = ref(false);
		const showChangePassword = ref(false);
		const updatePassword = ref({});
		const parsedUser = ref({...auth.user.value});

		return {
			saving,
			parsedUser,
			getInitials,
			showChangePassword,
			updatePassword,
			savingPassword,
			...useEvents(),
			...useUser(),
			...storeToRefs(authStore())
		};
	},

	computed: {
		showAlert() {
			const address = Object.values(this.parsedUser.address || {});
			const noAddress = !address.length || !!address.some((value) => !value);

			return !this.parsedUser.cpf || noAddress;
		},
	},

	watch: {
		user: {
			handler(newUser) {
				this.parsedUser = { ...newUser };
			},
			deep: true,
		},
	},

	methods: {
		async save() {
			if (!this.parsedUser.name) {
				this.alert({
					message: 'Nome Completo é obrigatório',
					type: 'error',
					timeout: 3000,
				});
				return;
			}
			
			this.saving = true;
			try {
				await this.saveUser(this.parsedUser);
				this.alert({
					message: 'Dados salvos com sucesso',
					type: 'success',
					timeout: 3000,
				});
			} catch {
				this.alert({
					message: 'Erro ao salvar dados',
					type: 'error',
					timeout: 3000,
				});
			}
			this.saving = false;
		},

		async changePassword() {
			if (this.updatePassword.newPassword != this.updatePassword.confirmPassword) {
				this.alert({
					message: 'As senhas não conferem',
					type: 'error',
					timeout: 3000,
				});
				return;
			}

			this.savingPassword = true;
			try {
				delete this.updatePassword.confirmPassword;
				this.updatePassword.email = this.user.email;
				this.updatePassword.id = this.user.id;

				await this.changePassword(this.updatePassword);
				this.alert({
					message: 'Senha atualizada com sucesso',
					type: 'success',
					timeout: 3000,
				});
			} catch {
				this.alert({
					message: 'Erro ao atualizar senha',
					type: 'error',
					timeout: 3000,
				});
			}
			this.showChangePassword = false;
			this.savingPassword = false;
			this.resetPassword();
		},

		resetPassword() {
			this.updatePassword = {};
		},
	},
};
</script>

<template>
	<Template title="Perfil">
		<div class="flex flex-col gap-2xl">
			<Alert v-if="showAlert" message="Para gerar os documentos, todos seus dados devem estar preenchidos" />
			<Card class="flex flex-col gap-2xl">
				<div class="flex items-center gap-lg">
					<div class="flex items-center justify-center rounded-full bg-primary-500 min-w-[84px] min-h-[84px]">
						<p class="text-white py-xl px-2xl text-[36px]">{{ getInitials(user.name) }}</p>
					</div>
					<div class="flex flex-col gap-xs [&>*]:text-gray-500 [&>*]:font-bold">
						<h3 class="text-20">{{ user.name }}</h3>
						<p class="text-14">{{ user.email }}</p>
					</div>
				</div>
				<div class="flex items-end flex-wrap gap-sm [&>*]:flex-1">
					<Input v-model="parsedUser.name" label="Nome Completo" required />
					<Input v-model="parsedUser.cpf" label="CPF" mask="cpf" />
				</div>
				<Address v-model="parsedUser.address" />
				<Button class="self-start" :disabled="saving" @click="showChangePassword = true">Atualizar Senha</Button>
			</Card>
			<Button class="self-end" :loading="saving" @click="save">Salvar</Button>
		</div>
		<Dialog v-model="showChangePassword" :disabled="savingPassword" @update:model-value="resetPassword">
			<div class="flex flex-col gap-base min-w-[60vw]">
				<h1 class="text-16 font-bold text-gray-500">Atualizar Senha</h1>
				<Input v-model="updatePassword.password" label="Senha" type="password" required />
				<Input v-model="updatePassword.newPassword" label="Nova Senha" type="password" />
				<Input v-model="updatePassword.confirmPassword" label="Confirmar Senha" type="password" />
				<div class="flex justify-end gap-sm mt-xs">
					<Button secondary :disabled="savingPassword" @click="showChangePassword = false">Cancelar</Button>
					<Button :loading="savingPassword" @click="changePassword">Atualizar</Button>
				</div>
			</div>
		</Dialog>
	</Template>
</template>
