<script lang="ts">
import { authStore } from "~/stores/auth";
import cids from "~/assets/cid10.json";

export default {
  name: "Certificate",

  props: {
    pacients: {
      type: Array,
      required: true,
    },
  },

  setup() {
    return {
      certificate: ref({}),
      ...useEvents(),
      ...authStore(),
    };
  },

  computed: {
    types() {
      return ["Comparecimento", "Licença trabalho", "Licença escolar"];
    },
    cids() {
      if (!this.searchQuery) return cids;
      return cids.filter((cid) =>
        cid.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },

  methods: {
    check() {
      if (
        this.certificate.pacient == null ||
        this.certificate.type == null ||
        this.certificate.cid == null ||
        this.certificate.dateConsulta == null ||
        (this.certificate.type != "Comparecimento" &&
          (this.certificate.startDate == null ||
            this.certificate.endDate == null)) ||
        (this.certificate.type == "Comparecimento" &&
          (this.certificate.startTimeConsulta == null ||
            this.certificate.endTimeConsulta == null))
      ) {
        this.alert({
          message: "Favor preencher todos os campos obrigatórios",
          type: "error",
          timeout: 3000,
        });
        return false;
      }

      return true;
    },

    generateCertificate() {
      if (!this.check()) return;
      const certificate = encodeURIComponent(JSON.stringify(this.certificate));
      this.$emit("generate", {
        path: "/print/certificate",
        query: { certificate },
      });
    },
  },
};
</script>

<template>
  <Card class="card">
    <Select
      v-model="certificate.pacient"
      :items="pacients"
      label="Paciente"
      label-key="name"
      searchable
      required
    />
    <div class="flex items-end flex-wrap gap-sm">
      <Select
        v-model="certificate.type"
        :items="types"
        label="Tipo"
        required
        class="row-2-input"
      />

      <Select
        v-model="certificate.cid"
        :items="cids"
        label="CID"
        searchable="true"
        labelKey="name"
        required
        class="row-2-input"
      />
    </div>

    <div class="flex items-end flex-wrap gap-sm">
      <DatePicker
        v-model="certificate.dateConsulta"
        required
        label="Data da Consulta"
        class="row-2-input"
      />
      <template v-if="certificate.type && certificate.type != 'Comparecimento'">
        <DatePicker
          v-model="certificate.startDate"
          label="Data de Início"
          required
          class="row-2-input"
        />
        <DatePicker
          v-model="certificate.endDate"
          label="Data de Término"
          required
          class="row-2-input"
        />
      </template>
    </div>

    <div
      class="flex items-end flex-wrap gap-sm"
      v-if="certificate.type == `Comparecimento`"
    >
      <Input
        icon="schedule"
        placeholder="00:00"
        mask="time"
        v-model="certificate.startTimeConsulta"
        label="Horário de Início"
        required
        class="row-2-input"
      />
      <Input
        icon="schedule"
        placeholder="00:00"
        mask="time"
        v-model="certificate.endTimeConsulta"
        label="Horário de Término"
        required
        class="row-2-input"
      />
    </div>
  </Card>

  <Button
    :disabled="!user.cpf"
    class="self-end save-button"
    @click="generateCertificate"
    >Gerar</Button
  >
</template>

<style scoped>
.save-button {
  margin-top: 2%;
  float: right;
}

.row-2-input {
  flex: 1;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.3%;
}
</style>
