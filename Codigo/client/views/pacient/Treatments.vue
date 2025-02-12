<script lang="ts">
export default {
  name: "PacientTreatments",

  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["update:modelValue"],

  setup() {
    const newTreatment = ref({ custom: true });
    const showTreatment = ref(false);
    const loading = ref(false);
    const formLoading = ref(false);
    const options = ref({ sortBy: "element" });
    const headers = [
      {
        text: "Nome",
        value: "element",
        sortable: true,
      },
      {
        text: "Espiritual",
        value: "spiritual",
        sortable: true,
      },
      {
        text: "Sensorial",
        value: "sensorial",
        sortable: true,
      },
      {
        text: "Rítmico",
        value: "rhythmic",
        sortable: true,
      },
      {
        text: "Motor",
        value: "motor",
        sortable: true,
      },
      {
        text: "Mental",
        value: "mental",
        sortable: true,
      },
    ];

    return {
      headers,
      showTreatment,
      newTreatment,
      options,
      loading,
      formLoading,
      ...useEvents(),
      ...useTreatments(),
    };
  },

  methods: {
    async updateModel() {
      this.loading = true;
      try {
        this.modelValue.treatments = await this.listTreatments(
          this.modelValue.id
        );
        this.$emit("update:modelValue", this.modelValue);
      } catch (error) {
        console.error("Erro ao atualizar tratamentos:", error);
      } finally {
        this.loading = false;
      }
    },

    async saveTreatment() {
      if (!this.newTreatment.element) {
        this.alert({
          message: "O nome do tratamento antes de salvar",
          type: "error",
          timeout: 3000,
        });
        return;
      }

      this.formLoading = true;
      try {
        if (this.newTreatment.id) {
          await this.updateTreatment(this.newTreatment);
        } else {
          await this.createTreatment(this.modelValue.id, this.newTreatment);
        }

        this.alert({
          message: "Tratamento salvo com sucesso",
          type: "success",
          timeout: 3000,
        });
        await this.updateModel();
      } catch {
        this.alert({
          message: "Erro ao salvar tratamento",
          type: "error",
          timeout: 3000,
        });
      }
      this.formLoading = false;
      this.showTreatment = false;
      this.resetTreatment();
    },

    editTreatment(item: any) {
      this.newTreatment = { ...item };
      this.showTreatment = true;
    },

    async deleteTreatment(id: number) {
      const result = await this.confirm({
        title: "Deletar esse tratamento?",
        description:
          "Tem certeza que deseja deletar esse tratamento? Essa ação será permanente.",
      });
      if (!result) return;

      this.loading = true;
      try {
        await this.deleteTreatment(id);
        this.alert({
          message: "Tratamento deletado com sucesso",
          type: "success",
          timeout: 3000,
        });
        await this.updateModel();
      } catch {
        this.alert({
          message: "Erro ao deletar tratamento",
          type: "error",
          timeout: 3000,
        });
      }
      this.loading = false;
    },

    resetTreatment() {
      this.newTreatment = { custom: true };
      this.selectedTreatment = -1;
    },
  },
};
</script>

<template>
  <div class="flex flex-col gap-lg">
    <div class="flex items-center gap-sm">
      <h1 class="text-20 font-bold text-gray-500">Tratamentos</h1>
      <RoundButton size="small" class="w-fit" @click="showTreatment = true" />
    </div>
    <Table
      :headers="headers"
      :items="modelValue.treatments"
      :options="options"
      :loading="loading"
    >
      <template #element="{ item }">
        <td>
          {{ item.element }}
        </td>
      </template>
      <template #spiritual="{ item }">
        <td>
          {{ item.spiritual }}
        </td>
      </template>
      <template #sensorial="{ item }">
        <td>
          {{ item.sensorial }}
        </td>
      </template>
      <template #rhythmic="{ item }">
        <td>
          {{ item.rhythmic }}
        </td>
      </template>
      <template #motor="{ item }">
        <td>
          {{ item.motor }}
        </td>
      </template>
      <template #mental="{ item }">
        <td>
          {{ item.mental }}
        </td>
      </template>

      <template #actions="{ item }">
        <td class="w-2">
          <ActionCard
            :hide-delete="!item.custom"
            @edit="editTreatment(item)"
            @delete="deleteTreatment(item.id)"
          />
        </td>
      </template>
    </Table>
  </div>
  <Sidebar
    v-model="showTreatment"
    title="Tratamento"
    width="fit-content"
    :loading="formLoading"
    @save="saveTreatment"
    @update:model-value="resetTreatment"
  >
    <div class="flex flex-col gap-lg">
      <Input
        v-model="newTreatment.element"
        label="Nome"
        required
        :disabled="!newTreatment.custom"
      />
      <div class="group-holder">
        <Input v-model="newTreatment.spiritual" label="Espiritual" />
        <Input v-model="newTreatment.sensorial" label="Sensorial" />
      </div>
      <div class="group-holder">
        <Input v-model="newTreatment.rhythmic" label="Rítmico" />
        <Input v-model="newTreatment.motor" label="Motor" />
      </div>
      <Input v-model="newTreatment.mental" label="Mental" />
    </div>
  </Sidebar>
</template>

<style scoped>
td {
  @apply text-gray-500 text-12;
}

.group-holder {
  @apply flex gap-sm [&>*]:flex-1;
}
</style>
