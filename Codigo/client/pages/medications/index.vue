<template>
  <Template
    v-model="formOpened"
    title="Remédios"
    form-title="Remédio"
    :form-loading="formLoading"
    @save="handleRemedio"
  >
    <template #form>
      <div class="flex flex-col gap-lg">
        <Input v-model="newMedication.name" label="Nome" required />
        <Input v-model="newMedication.type" label="Tipo" required />
        <Select
          v-model="newMedication.usage"
          label="Uso"
          :items="usageOptions"
          required
        />
      </div>
    </template>

    <div class="flex flex-col gap-2xl">
      <Input
        v-model="searchQuery"
        type="search"
        class="w-[500px] max-w-full"
        placeholder="Pesquisar remédio"
      />

      <Table
        :headers="headers"
        :items="filteredMedications"
        :options="sortOptions"
        :loading="loading"
      >
        <template #name="{ item }">
          <td class="text-gray-500 text-12">{{ item.name }}</td>
        </template>
        <template #type="{ item }">
          <td class="text-gray-500 text-12">{{ item.type }}</td>
        </template>
        <template #usage="{ item }">
          <td>
            <Tag>{{ item.usage }}</Tag>
          </td>
        </template>
        <template #actions="{ item }">
          <td class="w-2">
            <ActionCard
              @edit="openEditMedication(item)"
              @delete="deleteMedicationOperation(item)"
            />
          </td>
        </template>
      </Table>
    </div>
  </Template>
</template>

<script lang="ts">
import { ref, computed, onMounted } from "vue";

export default {
  name: "Remedios",

  setup() {
    const formOpened = ref(false);
    const newMedication = ref({} as any);
    const medications = ref([]);
    const searchQuery = ref("");
    const headers = ref([
      { text: "Nome", value: "name", sortable: true },
      { text: "Tipo", value: "type" },
      { text: "Uso", value: "usage" },
    ]);
    const sortOptions = ref({
      sortBy: "name",
      sortDesc: true,
    });
    const formLoading = ref(false);
    const loading = ref(false);
    const usageOptions = ref(["Oral", "Injetável", "Topical"]);

    const {
      listAllRemedios,
      createMedication,
      updateMedication,
      deleteMedication,
    } = useMedications();
    const { alert, confirm } = useEvents();

    const fetchMedications = async () => {
      loading.value = true;
      medications.value = await listAllRemedios();
      loading.value = false;
    };

    const handleRemedio = async () => {
      if (
        !newMedication.value.name ||
        !newMedication.value.type ||
        !newMedication.value.usage
      ) {
        alert({
          message: "Preencha todos os campos obrigatórios antes de salvar",
          type: "error",
          timeout: 3000,
        });
        return;
      }

      formLoading.value = true;

      try {
        if (!newMedication.value.id) {
          await createMedication(newMedication.value);
        } else {
          await updateMedication(newMedication.value.id, newMedication.value);
        }
        await fetchMedications();
        alert({
          message: "Remédio salvo com sucesso",
          type: "success",
          timeout: 3000,
        });
      } catch {
        alert({
          message: "Erro ao salvar remédio",
          type: "error",
          timeout: 3000,
        });
      }

      formLoading.value = false;
      formOpened.value = false;
      newMedication.value = {};
    };

    const openEditMedication = (item: any) => {
      formOpened.value = true;
      newMedication.value = { ...item };
    };

    const deleteMedicationOperation = async (item: any) => {
      const confirmed = await confirm({
        title: "Deletar esse remédio?",
        description:
          "Tem certeza que deseja deletar esse remédio? Essa ação será permante",
      });
      if (!confirmed) return;

      try {
        await deleteMedication(item.id);
        await fetchMedications();
        alert({
          message: "Remédio deletado com sucesso",
          type: "success",
          timeout: 3000,
        });
      } catch {
        alert({
          message: "Erro ao deletar remédio",
          type: "error",
          timeout: 3000,
        });
      }
    };

    const filteredMedications = computed(() => {
      if (!searchQuery.value) return medications.value;
      return medications.value.filter((medication) =>
        medication.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    onMounted(fetchMedications);

    return {
      formOpened,
      newMedication,
      medications,
      searchQuery,
      headers,
      formLoading,
      handleRemedio,
      openEditMedication,
      deleteMedicationOperation,
      sortOptions,
      filteredMedications,
      usageOptions,
      loading,
    };
  },
};
</script>
