<template lang="">
	<div class="flex items-center justify-center w-full h-screen p-lg">
		<Card class="recovery-card">
			<div class="card-group">
				<h2 class="text-20 font-bold text-primary-500">Redefinição de senha</h2>
				<p class="text-14 text-gray-500">Informe o email associado à sua conta para redefinir sua senha</p>
				<p class="text-14 text-gray-500">O email pode ter sido marcado como spam ou considerado perigoso.</p>
			</div>
			<div class="flex flex-col gap-base">
				<Input
					v-model="email"
					label="E-mail"
					type="email"
					:is-error="inputError.hasError"
					:error-message="inputError.errorMessage"
					required
				/>
				<div v-if="notSent">
					<p class="text-14 text-gray-500">
						Não recebeu o email?
						<span
							class="text-primary-500 cursor-pointer"
							@click="handleSendEmail"
							>Clique aqui para reenviar</span
						>
					</p>
				</div>
				<Button
					class="button"
					@click="handleSendEmail"
					:loading="isLoading"
				>
					Enviar e-mail
				</Button>
			</div>
		</Card>
	</div>
</template>
<script lang="ts" setup>
const email = ref('');
const notSent = ref(false);
const isLoading = ref(false);
const inputError = ref({ hasError: false, errorMessage: '' });

const handleSendEmail = async () => {
	try {
		if (!email.value) {
			inputError.value = { hasError: true, errorMessage: 'Preencha o campo e-mail' };
			return;
		} else {
			inputError.value = { hasError: false, errorMessage: '' };
		}

		isLoading.value = true;
		await useRecovery().sendEmail(email.value);
		useEvents().alert({
			message: 'E-mail enviado com sucesso',
			type: 'success',
			timeout: 3000,
		});
		isLoading.value = false;
		if (!notSent.value) {
			notSent.value = true;
		}
	} catch (error) {
		console.error('Erro ao enviar e-mail:', error);
		useEvents().alert({
			message: 'Erro ao enviar o email!',
			type: 'error',
			timeout: 3000,
		});
	}
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
