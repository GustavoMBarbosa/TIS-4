<script lang="ts">
import { authStore } from "../stores/auth";
export default {
  name: "Home",
  setup() {
    const { user } = authStore();
	const cards = ref([
      {
        title: "Gerenciar pacientes",
        icon: "https://lottie.host/embed/d0467426-1548-45a1-aa3d-19d29d0b4be0/5h0nfasUVC.json",
        link: "/pacients",
      },
      {
        title: "Gerenciar consultas",
        icon: "https://lottie.host/embed/0455a323-7807-4ed3-b249-80dcc93308a2/80FkGExZix.json",
        link: "/agenda",
      },
      {
        title: "Gerenciar recibos",
        icon: "https://lottie.host/embed/b5552b05-6e61-45a6-b7c1-35d04df41f11/ScvzXg1B7d.json",
        link: "/receipts",
      },
      {
        title: "Gerar documentos",
        icon: "https://lottie.host/embed/bbda7d68-6197-40be-9250-d466ec18e87f/MbJgTG4YmU.json",
        link: "/generate",
      },
    ]);

    return {
      user: ref(user),
	  cards,
    };
  },
};
</script>

<template>
  <Template>
    <div class="flex flex-col gap-lg">
      <div class="home-holder">
        <h1 class="text-20 font-bold text-primary-500">
          Bem vindo(a) {{ user.name }}!
        </h1>
        <h4 class="text-16 text-gray-500">
          Explore as funcionalidades que o Medsync pode oferecer
        </h4>
        <h4 class="text-16 text-gray-500">Por onde vamos começar hoje?</h4>
      </div>
      <div class="flex flex-wrap gap-xl [&>*]:flex-1">
        <nuxt-link v-for="card in cards" :to="card.link">
          <Card class="action-card">
            <iframe :src="card.icon"></iframe>
            <p>{{ card.title }}</p>
          </Card>
        </nuxt-link>
      </div>
    </div>
  </Template>
</template>

<style scoped>
.home-holder {
  @apply flex flex-col gap-sm text-gray-500;
}

.action-card {
  @apply flex flex-col items-center justify-center gap-sm cursor-pointer hover:scale-105 transition-all duration-300;

  iframe {
    @apply w-full h-full pointer-events-none;
  }

  p {
    @apply whitespace-nowrap text-16 font-bold text-gray-500;
  }
}
</style>
