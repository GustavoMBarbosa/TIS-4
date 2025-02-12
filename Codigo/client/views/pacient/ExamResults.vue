<script lang="ts">
import { formatDate } from "~/util";

export default {
  name: "PacientExams",

  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["update:modelValue"],

  setup() {
    const model = ref({});
    const newResult = ref({});
    const showResult = ref(false);
    const selectedResult = ref(-1);
    const formLoading = ref(false);
    const loading = ref(false);
    const options = ref({ sortBy: "date" });
    const headers = ref([
      {
        text: "Data",
        value: "date",
        sortable: true,
      },
      {
        text: "Valor",
        value: "value",
        sortable: true,
      },
    ]);

    return {
      model,
      headers,
      showResult,
      newResult,
      options,
      formLoading,
      loading,
      ...useEvents(),
    };
  },

  watch: {
    modelValue() {
      this.init();
    },
  },

  created() {
    this.init();
  },

  methods: {
    init() {
      this.model = this.modelValue;
      if (!Array.isArray(this.model.results)) this.model.results = [];
    },

    async updateModel() {
      this.$emit("update:modelValue", this.model);
    },

    saveResult() {
      if (!this.newResult.value || !this.newResult.date) {
        this.alert({
          message: "Preencha todos os campos antes de salvar",
          type: "error",
          timeout: 3000,
        });
        return;
      }

      const isSame = this.model.results.find((result, index) => {
        const date = new Date(result.date).toISOString().substring(0, 10);
        const newDate = new Date(this.newResult.date).toISOString().substring(0, 10);
        return date == newDate && index != this.selectedResult
      })

      if (isSame) {
        this.alert({
          message: "Já existe um resultado para essa data",
          type: "error",
          timeout: 3000,
        });
        return;
      }

      this.formLoading = true;
      try {
        if (this.selectedResult > -1) {
          this.model.results[this.selectedResult] = this.newResult;
        } else {
          this.model.results.push(this.newResult);
        }

        this.updateModel();

        this.alert({
          message: "Resultado atualizado com sucesso",
          type: "success",
          timeout: 3000,
        });
      } catch {
        this.alert({
          message: "Erro ao atualizar o resultado",
          type: "error",
          timeout: 3000,
        });
      }
      this.formLoading = false;

      this.resetResult();
      this.showResult = false;
    },

    editResult(item: any, index: number) {
      this.newResult = { ...item };
      this.selectedResult = index;
      this.showResult = true;
    },

    async deleteResult(index: number) {
      const result = await this.confirm({
        title: "Deletar esse resultado?",
        description:
          "Tem certeza que deseja deletar esse resultado? Essa ação será permante",
      });
      if (!result) return;

      this.loading = true;
      try {
        this.model.results.splice(index, 1);

        this.updateModel();

        this.alert({
          message: "Resultado deletado com sucesso",
          type: "success",
          timeout: 3000,
        });
      } catch {
        this.alert({
          message: "Erro ao deletar o resultado",
          type: "error",
          timeout: 3000,
        });
      }
      this.loading = false;
    },

    resetResult() {
      this.newResult = {};
      this.selectedResult = -1;
    },

    formatDate(date) {
      return formatDate(new Date(date), {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    },
  },
};
</script>

<template>
  <div class="flex items-center gap-sm">
    <h3 class="text-gray-500 font-bold text-14">Resultados</h3>
    <RoundButton size="small" @click="showResult = true" />
  </div>
  <Table
    :headers="headers"
    :items="model.results && Array.from(model.results)"
    :options="options"
    :loading="loading"
  >
    <template #date="{ item }">
      <td>
        {{ formatDate(item.date) }}
      </td>
    </template>
    <template #value="{ item }">
      <td>
        {{ item.value }}
      </td>
    </template>
    <template #actions="{ item, index }">
      <td class="w-2">
        <ActionCard
          @edit="editResult(item, index)"
          @delete="deleteResult(index)"
        />
      </td>
    </template>
  </Table>
  <Sidebar
    v-model="showResult"
    title="Resultado"
    :loading="formLoading"
    @save="saveResult"
    @update:model-value="resetResult"
  >
    <div class="flex flex-col gap-lg">
      <Input v-model="newResult.value" label="Valor" text-area required />
      <DatePicker
        v-model="newResult.date"
        label="Data"
        :max-date="new Date()"
        required
      />
    </div>
  </Sidebar>
</template>

<style scoped>
td {
  @apply text-gray-500 text-12;
}
</style>
