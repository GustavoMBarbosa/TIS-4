<script lang="ts">
import { usePacients } from "~/composables/usePacients";
import { authStore } from "~/stores/auth";
import Prescription from "~/views/generate/prescription.vue";
import Certificate from "~/views/generate/certificate.vue";

export default {
  name: "Generate",

  setup() {
    const pacientList = ref<any>([]);
    const { listPacients } = usePacients();

    return {
      selected: ref(0),
      pacientList,
      listPacients,
      ...authStore(),
    };
  },

  computed: {
    items() {
      return [
        {
          text: "Receita",
          component: Prescription,
        },
        {
          text: "Atestado",
          component: Certificate,
        },
      ];
    },
  },

  async mounted() {
    this.pacientList = await this.listPacients();
  },

  methods: {
    generate(route: any) {
      this.$router.push(route);
    }
  },
};
</script>

<template>
  <Template title="Gerar documento">
    <Alert v-if="!user.cpf" class="mb-3"
      >Para gerar os documentos todos seus dados dever estar preenchidos.
      <a class="clique-aqui" href="/profile">Clique aqui</a> para completar seu
      cadastro</Alert
    >

    <Tab v-model="selected" :items="items" class="w-fit" />

    <component :is="items[selected].component" :pacients="pacientList" @generate="generate" />
  </Template>
</template>
