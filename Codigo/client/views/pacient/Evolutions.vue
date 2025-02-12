<template>
  <Sidebar
    v-model="isOpenEvolution"
    title="Evolução"
    form-title="Consulta"
    :loading="formLoading"
    @save="saveEvoltion"
    @update:model-value="resetEvolution"
  >
    <div class="flex flex-col gap-base">
      <DatePicker
        label="Data"
        v-model="newEvolution.date"
        required
        :max-date="new Date()"
        :disabled="isToday"
      />

      <Checkbox
        label="Hoje"
        v-model="isToday"
        @update:model-value="changeEvolutionDate"
        >Hoje</Checkbox
      >

      <Input label="Anotação" v-model="newEvolution.notes" text-area />
    </div>
  </Sidebar>

  <div class="flex items-center gap-sm">
    <h1 class="text-20 font-bold text-gray-500">Evolução</h1>
    <RoundButton size="small" class="w-fit" @click="isOpenEvolution = true" />
  </div>

  <div ref="card" class="card-holder" v-if="modelValue.evolutions.length">
    <Card class="evolutions-card" :class="{ 'flex-col': isPhone }">
      <div class="flex flex-col gap-lg" :class="{ 'h-full': !isPhone }">
        <DatePicker v-model="filterDates" is-compare
          >Filtrar por periodo</DatePicker
        >
        <History
          v-model="evolution"
          :items="evolutions"
          valueKey="date"
          labelKey="date"
          :loading="loading"
        >
          <template #item="{ item }">
            {{ toPrettyDate(item.date) }}
          </template>
          <template #actions="{ item, index }">
            <Icon
              class="clickable delete"
              name="delete"
              @click="deleteEvoltion(item.id)"
            />
          </template>
        </History>
      </div>

      <Divider :vertical="!isPhone" />

      <div class="flex flex-col gap-sm h-full flex-1">
        <Input
          v-model="evolution.notes"
          class="notes"
          label="Anotações"
          :disabled="loading || formLoading"
          text-area
        />

        <Button
          class="self-end"
          size="small"
          :loading="formLoading"
          :disabled="loading"
          @click="saveNotes"
          >Salvar anotações</Button
        >
      </div>
    </Card>
  </div>
  <Card class="flex items-center justify-center p-xl" v-else>
    <div class="flex flex-col items-center justify-center gap-lg">
      <iframe
        src="https://lottie.host/embed/078fe5c6-b2a9-4572-957c-14e8f116399a/xLE7X2WZK0.json"
        class="w-full h-[200px]"
      ></iframe>
      <h3 class="text-gray-500 font-bold text-16">Sem dados para exibir</h3>
    </div>
  </Card>
</template>

<script lang="ts">
import { formatDate } from "~/util";

export default {
  name: "Evolutions",

  props: {
    modelValue: Object,
  },

  setup() {
    const loading = ref(false);
    const formLoading = ref(false);
    const isPhone = ref(false);
    const isOpenEvolution = ref(false);
    const isToday = ref(false);
    const newEvolution = ref({});
    const evolution = ref({});
    const filterDates = ref([]);
    const card = ref<HTMLDivElement>();
    const resizeObserver = ref<MutationObserver>();

    return {
      loading,
      formLoading,
      isOpenEvolution,
      isToday,
      newEvolution,
      evolution,
      isPhone,
      filterDates,
      resizeObserver,
      card,
      ...useEvolutions(),
      ...useEvents(),
    };
  },

  computed: {
    evolutions() {
      return this.modelValue.evolutions.filter((evolution) => {
        const evoDate = new Date(evolution.date).toISOString().substring(0, 10);
        if (!this.filterDates.length) return true;
        else if (this.filterDates.length == 1) {
          const date = this.filterDates[0].toISOString().substring(0, 10);
          return evoDate == date;
        } else {
          const startDate = this.filterDates[0].toISOString().substring(0, 10);
          const endDate = this.filterDates[1].toISOString().substring(0, 10);
          return evoDate >= startDate && evoDate <= endDate;
        }
      });
    },
  },

  beforeMount() {
    this.evolution =
      this.modelValue.evolutions.length > 0
        ? this.modelValue.evolutions[0]
        : {};
    window.addEventListener("resize", this.handleResize);
    this.handleResize()
  },

  mounted() {;
    this.resizeObserver = new ResizeObserver(this.resize);

    if (this.card) {
      const textArea = this.card.querySelector(".notes textarea");
      if (!this.isPhone) textArea.style.height = '350px';
      this.resizeObserver.observe(textArea, {box: "border-box"});
    }
  },

  beforeUnmount() {
    if (this.resizeObserver) this.resizeObserver.disconnect();
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    resize() {
      if (!this.card) return;
      if (this.isPhone) {
        this.card.style.height = 'fit-content';
        return;
      }

      const textArea = this.card.querySelector(".notes textarea");
      if (this.card.style.height == textArea.scrollHeight + 90 + "px") return;
      this.card.style.height = `${textArea.scrollHeight + 90}px`;
    },

    changeEvolutionDate(today: boolean) {
      if (today) this.newEvolution.date = new Date();
    },

    resetEvolution() {
      this.newEvolution = {};
      this.isToday = false;
    },

    toPrettyDate(date: Date) {
      return formatDate(new Date(date), {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },

    handleResize() {
      this.isPhone = window?.innerWidth <= 768;
    },

    async saveNotes() {
      this.formLoading = true;
      try {
        await this.updateEvolution(this.evolution.id, this.evolution);
        this.alert({
          message: "Anotações salvas com sucesso",
          type: "success",
          timeout: 3000,
        });
      } catch (e) {
        this.alert({
          message: "Erro ao salvar anotação",
          type: "error",
          timeout: 3000,
        });
      }
      this.formLoading = false;
    },

    async saveEvoltion() {
      if (!this.newEvolution.date) {
        this.alert({
          message: "Preencha a data antes de salvar",
          type: "error",
          timeout: 3000,
        });
        return;
      }
      const isSame = this.modelValue.evolutions.find((evolution) => {
        const evoDate = new Date(evolution.date).toISOString().substring(0, 10);
        const newDate = new Date(this.newEvolution.date)
          .toISOString()
          .substring(0, 10);
        return evoDate == newDate;
      });

      if (isSame) {
        this.alert({
          message: "Já existe uma evolução para essa data",
          type: "error",
          timeout: 3000,
        });
        return;
      }

      this.formLoading = true;
      try {
        await this.createEvolution(this.modelValue.id, this.newEvolution);
        this.alert({
          message: "Evolução criada com sucesso",
          type: "success",
          timeout: 3000,
        });

        this.resetEvolution();
        await this.loadEvolutions();
      } catch {
        this.alert({
          message: "Erro ao criar evolução",
          type: "error",
          timeout: 3000,
        });
      }

      this.isOpenEvolution = false;
      this.formLoading = false;
    },

    async loadEvolutions() {
      this.loading = true;
      try {
        this.filterDates = [];
        this.modelValue.evolutions = await this.listEvolutions(
          this.modelValue.id
        );
        this.evolution =
          this.modelValue.evolutions.length > 0
            ? this.modelValue.evolutions[0]
            : {};
      } catch {
        this.alert({
          message: "Erro ao carregar evoluções",
          type: "error",
          timeout: 3000,
        });
      }

      this.loading = false;
    },

    async deleteEvoltion(id: number) {
      const result = await this.confirm({
        title: "Deletar essa evolução?",
        description:
          "Tem certeza que deseja deletar essa evolução? Essa ação será permante",
      });
      if (!result) return;

      this.loading = true;
      try {
        await this.deleteEvolution(id);
        this.alert({
          message: "Evolução deletada com sucesso",
          type: "success",
          timeout: 3000,
        });
        await this.loadEvolutions();
      } catch (error) {
        this.alert({
          message: "Falha ao deletar evolução",
          type: "error",
          timeout: 3000,
        });
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.card-holder {
  height: 350px;
}

.evolutions-card {
  @apply flex gap-lg p-xl h-full;
}

.notes {
  @apply h-full flex-1;
}

.clickable {
  @apply text-16 cursor-pointer text-gray-400 hover:text-gray-500;
}

.delete {
  @apply hover:text-red-500;
}
</style>
