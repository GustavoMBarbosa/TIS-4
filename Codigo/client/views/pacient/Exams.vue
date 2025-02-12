<script lang="ts">
import ExamResults from "./ExamResults.vue";
import exams from "~/assets/exams.json";
import { formatDate } from "~/util";

export default {
  name: "PacientExams",

  components: {
    ExamResults,
  },

  props: {
    modelValue: Object,
  },

  setup() {
    const search = ref("");
    const showExam = ref(false);
    const loading = ref(false);
    const formLoading = ref(false);
    const newExam = ref({});
    const options = ref({
      sortBy: "name",
    });

    return {
      search,
      options,
      showExam,
      newExam,
      loading,
      formLoading,
      ...useEvents(),
      ...useExams(),
    };
  },

  computed: {
    headers() {
      const headers = [
        { text: "Exame", value: "name", sortable: true },
        { text: "Referência", value: "reference" },
      ];
      const results = [];

      this.modelValue.exams.forEach((exam) => {
        exam.results?.forEach((result) => {
          const date = this.formatDate(result.date);
          const header = results.find((h) => h.value == date);
          if (header) return;
          results.push({
            text: date,
            value: date,
          });
        });
      });
      results.sort((a, b) => a.value.localeCompare(b.value));

      return [...headers, ...results];
    },

    groupedExams() {
      return exams
        .map((exam) => {
          const results =
            this.modelValue.exams.find((e) => e.name == exam.name)?.results ||
            [];
          results.forEach((result) => {
            const date = this.formatDate(result.date);
            exam[date] = result.value;
          });

          return exam;
        })
        .filter((exam) =>
          exam.name.toLowerCase().includes(this.search.toLowerCase())
        );
    },

    sortedExams() {
      return exams
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((exam) => exam.name);
    },
  },

  methods: {
    formatDate(date) {
      return formatDate(new Date(date), {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    },

    async loadExams() {
      this.loading = true;
      this.modelValue.exams = await this.listExams(this.modelValue.id);
      this.loading = false;
    },

    async saveExam() {
      if (!this.newExam.name) {
        this.alert({
          message: "Selecione um exame antes de continuar",
          type: "error",
          timeout: 3000,
        });
        return;
      } else if (!this.newExam.results.length) {
        this.alert({
          message: "Adicione pelo menos um resultado para o exame",
          type: "error",
          timeout: 3000,
        });
        return;
      }

      this.formLoading = true;
      try {
        if (this.newExam.id) {
          await this.updateExam(this.newExam);
        } else {
          await this.createExam(this.modelValue.id, this.newExam);
        }

        this.showExam = false;
        this.resetExam();
        await this.loadExams();

        this.alert({
          message: "Exame salvo com sucesso",
          type: "success",
          timeout: 3000,
        });
      } catch {
        this.alert({
          message: "Erro ao salvar exame",
          type: "error",
          timeout: 3000,
        });
      }
      this.formLoading = false;
    },

    editExam(exam: any) {
      this.newExam = this.modelValue.exams.find((e) => e.name == exam.name) || {
        name: exam.name,
      };
      this.showExam = true;
    },

    resetExam() {
      this.newExam = {};
    },
  },
};
</script>

<template>
  <div class="flex flex-col gap-lg">
    <h1 class="text-20 font-bold text-gray-500">Exames</h1>
    <Input
      v-model="search"
      placeholder="Pesquisar"
      type="search"
      class="w-[500px] max-w-full"
    />
    <Table
      :headers="headers"
      :items="groupedExams"
      :options="options"
      :loading="loading"
    >
      <template v-for="header in headers" v-slot:[header.value]="{ item }">
        <td>
          <pre class="whitespace-pre-wrap font-sans">{{
            item[header.value]
          }}</pre>
        </td>
      </template>
      <template #actions="{ item }">
        <td class="w-2">
          <Icon class="clickable" name="edit" @click="editExam(item)" />
        </td>
      </template>
    </Table>
  </div>

  <Sidebar
    v-model="showExam"
    :title="newExam.name"
    width="60%"
    :loading="formLoading"
    @save="saveExam"
    @update:model-value="resetExam"
  >
    <div class="flex flex-col gap-lg">
      <ExamResults v-model="newExam" />
    </div>
  </Sidebar>
</template>

<style scoped>
td {
  @apply text-gray-500 text-12;
}

.clickable {
  @apply text-16 cursor-pointer text-gray-400 hover:text-gray-500;
}

.delete {
  @apply hover:text-red-500;
}
</style>
