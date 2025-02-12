<template>
  <Template>
    <nuxt-link class="text-primary-500 hover:underline" to="/generate">
      < Voltar</nuxt-link
    >
    <PrintTemplate title="Atestado">
      <div class="content">
        <div class="content-item">
          <div class="item">
            <p>{{ getMensagemAtestado }}</p>
            <p><br /></p>
            <p>
              Data: <br />
              {{ dateConsulta }}
            </p>
            <p> CID: {{ certificate.cid.code }} - {{ certificate.cid.name }} </p>
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
import Certificate from "../../views/generate/certificate.vue";

export default {
  name: "CertificateTemplate",

  setup() {
    return {
      certificate: ref({}),
      ...authStore(),
    };
  },

  beforeMount() {
    if (!this.$route.query.certificate) this.$router.back();
    this.certificate = JSON.parse(
      decodeURIComponent(this.$route.query.certificate)
    );
  },

  computed: {
    startDate() {
      return formatDate(new Date(this.certificate.startDate), {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    },

    endDate() {
      return formatDate(new Date(this.certificate.endDate), {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    },

    dateConsulta() {
      return formatDate(new Date(this.certificate.dateConsulta), {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    },

    getMensagemAtestado() {
      const date1 = new Date(this.certificate.startDate);
      const date2 = new Date(this.certificate.endDate);
      const timeDiff = Math.abs(date2.getTime() - date1.getTime());
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if (this.certificate.type === "Comparecimento") {
        return `Atesto para os devidos fins que ${this.certificate.pacient.name} esteve em consulta médica neste dia no horário entre às ${this.certificate.startTimeConsulta} e às ${this.certificate.endTimeConsulta} H.`;
      } else if (this.certificate.type === "Licença trabalho") {
        return `Atesto para os devidos fins que ${this.certificate.pacient.name} necessita ausentar-se de suas atividades labor ativas por um período de ${diffDays} dias a contar do presente dia visando sua melhora clínica.`;
      } else if (this.certificate.type === "Licença escolar") {
        return `Atesto para devidos fins que ${this.certificate.pacient.name} necessita ausentar-se de suas atividades escolares/ acadêmicas  por um período de ${diffDays} dias a contar do presente dia visando sua melhora clínica.`;
      }
    },
  },
};
</script>

<style scoped>
.content {
  @apply flex flex-col gap-base;

  b {
    @apply text-gray-500;
  }
}

.content-item {
  @apply flex justify-between gap-base;
}

.item {
  @apply flex flex-col gap-sm;
}
</style>
