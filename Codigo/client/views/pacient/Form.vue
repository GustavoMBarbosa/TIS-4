<script lang="ts">
import Id from "./Id.vue";
import Record from "./Record.vue";
import MainComplaint from "./MainComplaint.vue";
import Family from "./Family.vue";
import Biography from "./Biography.vue";
import FisicalExam from "./FisicalExam.vue";
import Assessment from "./Assessment.vue";
import Exams from "./Exams.vue";
import Surgeries from "./Surgeries.vue";
import Evolutions from "./Evolutions.vue";
import Treatments from "./Treatments.vue"

export default {
  name: "PacientForm",

  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
    gettingUser: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    return {
      cachingInterval: ref(),
      selected: ref(0),
      loading: ref(false),
      model: ref({}),
      ...useEvents(),
      ...usePacients(),
    };
  },

  computed: {
    items() {
      return [
        {
          text: "Identificação",
          component: Id,
        },
        {
          text: "Ficha",
          component: Record,
        },
        {
          text: "QP",
          component: MainComplaint,
        },
        {
          text: "Família",
          component: Family,
        },
        {
          text: "Biografia",
          component: Biography,
        },
        {
          text: "Exame Físico",
          component: FisicalExam,
        },
        {
          text: "Diagnóstico/Conduta",
          component: Assessment,
        },
        {
          text: "Evolução",
          component: Evolutions,
        },
        {
          text: "Tratamentos",
          component: Treatments,
        },
        {
          text: "Exames",
          component: Exams,
        },
        {
          text: "Cirurgias",
          component: Surgeries,
        }
      ];
    },
  },

  watch: {
    modelValue: {
      handler() {
        this.model = this.modelValue || {};
      },
      deep: true,
    },
  },

  mounted() {
    this.cachingInterval = setInterval(() => {
      this.cachePacient(this.model);
    }, 50000);
  },

  created() {
    this.model = this.modelValue;
    this.model.fisicalExam = this.model.fisicalExam || {};
  },

  unmounted() {
    clearInterval(this.cachingInterval);
  },

  methods: {
    cancel() {
      this.$router.push("/pacients");
    },
    async save() {
      if (!this.model.name) {
        this.alert({
          message: "Nome é obrigatório",
          type: "error",
          timeout: 3000,
        });
        return;
      }

      this.loading = true;
      try {
        const parsedModel = { ...this.model }
        delete parsedModel.exams
        delete parsedModel.surgeries
        delete parsedModel.evolutions
        delete parsedModel.treatments

        await this.updatePacient(parsedModel);
        this.alert({
          message: "Paciente salvo com sucesso",
          type: "success",
          timeout: 3000,
        });
        this.cancel();
      } catch {
        this.alert({
          message: "Erro ao salvar paciente",
          type: "error",
          timeout: 3000,
        });
      }
      this.loading = false;
    },
  },
};
</script>

<template>
  <Template title="Paciente">
    <div class="content">
      <Tab v-model="selected" :items="items" class="w-fit" v-if="!gettingUser" />
      <component :is="items[selected].component" v-model="model" v-if="!gettingUser" />
      <Card v-else>
        <div class="flex flex-col gap-lg">
          <div class="flex gap-sm">
            <div class="skeleton flex-1" />
            <div class="skeleton flex-1" />
          </div>
          <div class="flex gap-sm">
            <div class="skeleton flex-1" />
            <div class="skeleton flex-1" />
            <div class="skeleton flex-1" />
          </div>
          <div class="flex gap-sm">
            <div class="skeleton flex-1" />
            <div class="skeleton flex-1" />
            <div class="skeleton flex-1" />
          </div>
          <div class="flex gap-sm">
            <div class="skeleton flex-1" />
            <div class="skeleton flex-1" />
          </div>
        </div>
      </Card>
      <div class="flex self-end gap-sm">
        <Button secondary @click="cancel">Cancelar</Button>
        <Button :loading="loading" @click="save">Salvar</Button>
      </div>
    </div>
  </Template>
</template>
<style scoped>

.content {
  @apply flex flex-col gap-lg pb-xl;
}
</style>