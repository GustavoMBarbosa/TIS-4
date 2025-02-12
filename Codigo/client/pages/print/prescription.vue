<template>
  <Template>
    <nuxt-link class="text-primary-500 hover:underline" to="/generate">
      < Voltar</nuxt-link>
        <PrintTemplate title="Receita">
          <div class="content">
            <div class="content-item">
              <p><b>Paciente: </b> {{ prescription.pacient.name }}</p>
              <p class="poso">{{ date }}</p>
              
            </div>
            <div class="content-item">
              <div class="item">
                <p><b>Prescrição: </b></p>
              </div>
            </div>
            <div v-for="(item, index) in prescription.medicine" :key="index" class="content-item">
              <p>{{ item.name }}</p>
              <p class="poso"> {{ item.posology }}</p>
            </div>
            <div class="content-item">
              <div class="item" v-if="prescription.description">
                <p class="description"><b>Observações: <br> </b>
                  {{ prescription.description }}</p>
              </div>
            </div>
            <div class="content-item">
              <p><b>Emitente:</b> {{ user.name }}</p>
              <p><b>CPF:</b> {{ user.cpf }}</p>
            </div>
          </div>
        </PrintTemplate>
  </Template>
</template>

<script lang="ts">
import { formatDate } from "~/util";
import { authStore } from "~/stores/auth";

export default {
  name: "PrescriptionTemplate",

  setup() {
    return {
      prescription: ref({}),
      ...authStore(),
    };
  },

  beforeMount() {
    if (!this.$route.query.prescription) this.$router.back();
    this.prescription = JSON.parse(decodeURIComponent(this.$route.query.prescription));
  },

  computed: {
    date() {
      return formatDate(new Date(), {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    }
  }

};
</script>

<style scoped>
.content {
  @apply flex flex-col gap-base;

  b {
    @apply text-gray-500;
  }
}

.poso {
  text-align: right;
}

.description {
  white-space: normal;
  word-break: break-all;
}

.content-item {
  @apply flex justify-between gap-base;
}

.item {
  @apply flex flex-col gap-sm;
}
</style>
