<script lang="ts">
import { authStore } from "~/stores/auth";

export default {
  name: "Prescription",

  props: {
    pacients: {
      type: Array,
      default: () => [],
    },
  },

  emits: ["generate"],

  setup() {
    return {
      prescription: ref({
        medicine: [
          {
            name: "",
            posology: "",
          },
        ],
      }),
      ...useEvents(),
      ...authStore(),
    };
  },

  methods: {
    addRow() {
      this.prescription.medicine.push({
        name: "",
        posology: "",
      });
    },

    deleteRow(row: Number) {
      this.prescription.medicine.splice(row, 1);
    },

    generatePrescription() {
      if (!this.check()) return;

      const prescriptionJson = encodeURIComponent(
        JSON.stringify(this.prescription)
      );
      this.$emit("generate", {
        path: "/print/prescription",
        query: { prescription: prescriptionJson },
      });
    },

    check() {
      if (this.prescription.pacient == null) {
        this.alert({
          message: "Favor selecionar um paciente",
          type: "error",
          timeout: 3000,
        });
        return false;
      } else if (this.prescription.medicine[0] == null) {
        this.alert({
          message: "Favor selecionar pelo menos um rémedio",
          type: "error",
          timeout: 3000,
        });
        return false;
      } else if (this.prescription.medicine[0].posology == null) {
        this.alert({
          message: "Favor selecionar pelo menos uma posologia",
          type: "error",
          timeout: 3000,
        });
        return false;
      }

      return true;
    },
  },
};
</script>

<template>
  <Card class="card">
    <Select
      v-model="prescription.pacient"
      :items="pacients"
      label="Paciente"
      label-key="name"
      searchable
      required
    />
    <div
      class="flex items-end flex-wrap gap-sm"
      v-for="(item, index) in prescription.medicine"
      :key="index"
    >
      <Input
        v-model="item.name"
        label="Remédio"
        required
        class="row-2-input"
      />

      <Input
        v-model="item.posology"
        label="Posologia"
        required
        class="row-2-input"
      />

      <Icon
        class="clickable"
        v-if="index != 0"
        name="delete"
        @click="deleteRow(index)"
      />
    </div>

    <div class="flex flex-col gap-base">
      <RoundButton class="w-fit" @click="addRow" />
      <Input
        v-model="prescription.description"
        label="Observações"
        text-area
        class="observation"
      />
    </div>
  </Card>

  <Button
    :disabled="!user.cpf"
    class="self-end save-button"
    @click="generatePrescription"
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

.clique-aqui {
  @apply cursor-pointer underline text-blue-500;
}

.clickable {
  @apply text-16 cursor-pointer text-gray-400 hover:text-gray-500;
  @apply hover:text-red-500;
  margin-bottom: 1.2%;
  font-size: x-large;
}
</style>
