<script lang="ts">
import { authStore } from "~/stores/auth";
import { computed, ref } from "vue";
import { isEmailValid } from "~/util/index";
import {
  GoogleSignInButton,
  type CredentialResponse,
  type Profile,
  decodeCredential,
} from "vue3-google-signin";

export default {
  name: "StartForm",

  props: {
    isNew: Boolean,
  },

  setup() {
    const user = ref({});
    const confirmPassword = ref("");
    const isLoading = ref(false);

    const handleLoginSuccess = (
      response: CredentialResponse & { profile: Profile }
    ) => {
      const { credential } = response;
      const route = useRoute();
      const userData = decodeCredential(credential);
      if (route.path === "/register") {
        user.value = {
          email: userData?.email,
          name: userData?.given_name,
          password: userData?.id,
        };
        authStore().createUser(user.value);
      } else if (route.path === "/login") {
        user.value = {
          email: userData?.email,
          password: userData?.id,
        };
        authStore().login(user.value);
      }
    };

    // handle an error event
    const handleLoginError = () => {
      console.error("Login failed");
    };

    return {
      user,
      isLoading,
      confirmPassword,
      handleLoginSuccess,
      handleLoginError,
      ...useEvents(),
      ...authStore(),
    };
  },

  computed: {
    settings() {
      if (this.isNew) {
        return {
          title: "Cadastrar",
          description: "Já possui conta?",
          link: "Clique aqui para entrar",
          to: "/login",
          errorMessage: "Erro ao criar seu usuário. Tente novamente mais tarde",
          callback: this.createUser,
        };
      }

      return {
        title: "Entrar",
        description: "Ainda não é registrado?",
        link: "Crie uma conta",
        to: "/register",
        errorMessage: "E-mail ou/e senha incorreto(s)",
        callback: this.login,
      };
    },
  },

  methods: {
    async validateUser() {
      if (!this.user.email || !this.user.password) {
        this.alert({
          message: "Todos os campos são obrigatórios",
          type: "error",
          timeout: 3000,
        });
        return;
      } else if (!isEmailValid(this.user.email)) {
        this.alert({
          message: "E-mail inválido",
          type: "error",
          timeout: 3000,
        });
        return;
      } else if (this.isNew && this.user.password != this.confirmPassword) {
        this.alert({
          message: "As senhas não conferem",
          type: "error",
          timeout: 3000,
        });
        return;
      }

      this.isLoading = true;
      try {
        await this.settings.callback(this.user);
      } catch (error) {
        if (error.response?.data?.message.includes("duplicate")) {
          this.alert({
            message: "Usuário já cadastrado",
            type: "error",
            timeout: 3000,
          });
        } else {
          this.alert({
            message: this.settings.errorMessage,
            type: "error",
            timeout: 3000,
          });
        }
      }
      this.isLoading = false;
    },
  },
};
</script>

<template>
  <div class="flex items-center justify-center w-full h-screen p-lg">
    <Card class="start-card">
      <div class="card-group">
        <h2 class="text-20 font-bold text-gray-500 self-start">
          {{ settings.title }}
        </h2>
        <p>
          {{ settings.description }}
          <a
            class="text-primary-500"
            :href="settings.to"
            :class="{ disabled: isLoading }"
            >{{ settings.link }}</a
          >
        </p>
      </div>
      <div class="flex flex-col gap-base">
        <Input v-model="user.email" label="E-mail" type="email" required />
        <div class="card-group">
          <Input
            v-model="user.password"
            label="Senha"
            type="password"
            required
          />
          <a
            href="/recovery-password"
            v-if="!isNew"
            class="self-end"
            :class="{ disabled: isLoading }"
            >Esqueceu sua senha?</a
          >
        </div>
        <Input
          v-if="isNew"
          v-model="confirmPassword"
          label="Confirmar senha"
          type="password"
          required
        />
        <Button @click="validateUser" :loading="isLoading">{{
          settings.title
        }}</Button>
      </div>
      <Divider position="both">ou</Divider>
      <GoogleSignInButton
        text="continue_with"
        width="320"
        @success="handleLoginSuccess"
        @error="handleLoginError"
        class="google-button"
      />
    </Card>
  </div>
</template>

<style scoped>
.start-card {
  @apply flex flex-col gap-lg w-fit min-w-[350px] text-12 text-gray-500;

  a {
    @apply text-primary-500 hover:underline;
  }

  a.disabled {
    @apply pointer-events-none;
  }
}

.card-group {
  @apply flex flex-col gap-xs;
}

.button {
  @apply w-fit;
  align-self: center;
}

.google-button {
  @apply self-center;
}
</style>
