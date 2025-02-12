<script lang="ts">
import { formatDate } from "~/util";

export default {
  name: "PacientSurgeries",

  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["update:modelValue"],

  setup() {
    const newSurgery = ref({});
    const showSurgery = ref(false);
    const loading = ref(false);
    const formLoading = ref(false);
    const options = ref({ sortBy: "date" });
    const headers = [
      {
        text: "Data",
        value: "date",
        sortable: true,
      },
      {
        text: "Nome",
        value: "name",
        sortable: true,
      },
      {
        text: "Laudo",
        value: "appraisal",
        sortable: true,
      },
    ];

    return {
      headers,
      showSurgery,
      newSurgery,
      options,
      loading,
      formLoading,
      ...useEvents(),
      ...useSurgeries(),
    };
  },

  methods: {
    async updateModel() {
      this.loading = true;
      this.modelValue.surgeries = await this.listSurgeries(this.modelValue.id);
      this.$emit("update:modelValue", this.modelValue);
      this.loading = false;
    },

    async saveSurgery() {
      if (!this.newSurgery.name || !this.newSurgery.date) {
        this.alert({
          message: "Preencha todos os campos antes de salvar",
          type: "error",
          timeout: 3000,
        });
        return;
      }

      this.formLoading = true;
      try {
        if (this.newSurgery.id) {
          await this.updateSurgery(this.newSurgery);
        } else {
          await this.createSurgery(this.modelValue.id, this.newSurgery);
        }

        this.alert({
          message: "Cirurgia salva com sucesso",
          type: "success",
          timeout: 3000,
        });
        await this.updateModel();
      } catch {
        this.alert({
          message: "Erro ao salvar cirurgia",
          type: "error",
          timeout: 3000,
        });
      }
      this.formLoading = false;
      this.showSurgery = false;
      this.resetSurgery();
    },

    editSurgery(item: any) {
      this.newSurgery = { ...item };
      this.showSurgery = true;
    },

    async deleteSurgery(id: number) {
      const result = await this.confirm({
        title: "Deletar essa cirurgia?",
        description:
          "Tem certeza que deseja deletar essa cirurgia? Essa ação será permante",
      });
      if (!result) return;

      this.loading = true;
      try {
        await this.deleteSurgery(id);
        this.alert({
          message: "Cirurgia deletada com sucesso",
          type: "success",
          timeout: 3000,
        });
        await this.updateModel();
      } catch {
        this.alert({
          message: "Erro ao deletar cirurgia",
          type: "error",
          timeout: 3000,
        });
      }
      this.loading = false;
    },

    resetSurgery() {
      this.newSurgery = {};
      this.selectedSurgery = -1;
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
  <div class="flex flex-col gap-lg">
    <div class="flex items-center gap-sm">
      <h1 class="text-20 font-bold text-gray-500">Cirurgias</h1>
      <RoundButton size="small" class="w-fit" @click="showSurgery = true" />
    </div>
    <Table
      :headers="headers"
      :items="modelValue.surgeries"
      :options="options"
      :loading="loading"
    >
      <template #date="{ item }">
        <td>
          {{ formatDate(item.date) }}
        </td>
      </template>
      <template #name="{ item }">
        <td>
          {{ item.name }}
        </td>
      </template>
      <template #appraisal="{ item }">
        <td class="whitespace-normal">
          {{ item.appraisal }}
        </td>
      </template>
      <template #actions="{ item }">
        <td class="w-2">
          <ActionCard
            @edit="editSurgery(item)"
            @delete="deleteSurgery(item.id)"
          />
        </td>
      </template>
    </Table>
  </div>
  <Sidebar
    v-model="showSurgery"
    title="Cirurgia"
    :loading="formLoading"
    @save="saveSurgery"
    @update:model-value="resetSurgery"
  >
    <div class="flex flex-col gap-lg">
      <Input v-model="newSurgery.name" label="Nome" required />
      <Input v-model="newSurgery.appraisal" label="Laudo" text-area />
      <DatePicker
        v-model="newSurgery.date"
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
