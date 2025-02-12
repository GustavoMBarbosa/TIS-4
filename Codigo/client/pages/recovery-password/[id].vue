<template>
	<div class="flex items-center justify-center w-full h-screen p-lg">
		<Card class="recovery-card">
			<div class="card-group">
				<h2 class="text-20 font-bold text-primary-500">Redefinição de senha</h2>
				<p class="text-14 text-gray-500">Informe o email associado à sua conta para redefinir sua senha</p>
			</div>
			<div class="flex flex-col gap-base">
				<Input
					v-model="password"
					label="Nova senha"
					type="password"
					:is-error="inputError.hasError"
					:error-message="inputError.errorMessage"
					required
				/>
				<Input
					v-model="passwordVerify"
					label="Confirmar nova senha"
					type="password"
					:is-error="inputError.hasError"
					:error-message="inputError.errorMessage"
					required
				/>
				<Button
					class="button"
					@click="handleResetPassword"
					:loading="isLoading"
				>
					Redefinir senha
				</Button>
			</div>
		</Card>
	</div>
</template>
<script lang="ts">
import { useEvents } from '~/composables/useEvents';

export default {
	name: 'RecoveryPassword',

	setup() {
		const route = useRoute();
		const token = route.params.id as string;
		const password = ref('');
		const passwordVerify = ref('');
		const isLoading = ref(false);
		const inputError = ref({ hasError: false, errorMessage: '' });
		return {
			route,
			token,
			password,
			passwordVerify,
			isLoading,
			inputError,
			...useEvents,
		};
	},
	methods: {
		async handleResetPassword() {
			try {
				this.isLoading = true;
				const error = await useRecovery().checkPassword(this.password, this.passwordVerify);
				if (error) {
					this.inputError = { hasError: true, errorMessage: error };
					this.isLoading = false;
					return;
				}
				const user = await useRecovery().changePassword(this.password, this.token);
				if (user) {
					this.isLoading = false;
					useEvents().alert({
						message: 'Senha redefinida com sucesso',
						type: 'success',
						timeout: 3000,
					});
					navigateTo('/login');
				} else {
					this.isLoading = false;
					userEvents().alert({
						message: 'Erro ao redefinir senha, por favor, tente novamente mais tarde.',
						type: 'error',
						timeout: 3000,
					});
				}
			} catch (error) {
				console.error('Erro ao redefinir senha:', error);
				// Adicione aqui uma notificação de erro
			}
		},
	},
};
</script>
<style scoped>
.card-group {
	@apply flex flex-col mb-base;
}
.button {
	@apply w-fit;
	align-self: center;
}
</style>
