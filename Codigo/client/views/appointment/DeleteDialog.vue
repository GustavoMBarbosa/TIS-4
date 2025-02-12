<script lang="ts">
export default {
  name: "DeleteAppointmentDialog",

  props: {
    modelValue: Boolean,
    appointment: {
      type: Object,
      required: true,
    },
  },

  setup() {
    const model = ref(false);
    const type = ref("one");
    return { model, type };
  },
  emits: ["update:modelValue", "confirm"],

  computed: {
    types() {
      return [
        { label: "Deletar apenas esse evento", value: "one" },
        { label: "Deletar todas as ocorrências", value: "all" },
      ];
    },
  },

  watch: {
    modelValue(value: boolean) {
      this.model = value;
    },
  },

  created() {
    this.model = this.modelValue;
  },

  methods: {
    handleChange(value: boolean) {
      this.model = value;
      this.type = "one";
      this.$emit("update:modelValue", value);
    },

    handleConfirm() {
      this.$emit("confirm", this.appointment.frequency != "ONCE" ? this.type : "all");
      this.handleChange(false);
    },
  },
};
</script>

<template>
  <Dialog v-model="model" @update:model-value="handleChange">
    <div class="flex flex-col gap-lg text-gray-500">
      <div class="flex flex-col gap-sm">
        <h1 class="text-16 font-bold confirm-text">
          Deletar esse agendamento?
        </h1>
        <p class="text-12 confirm-text">
          Tem certeza que deseja deletar esse agendamento? Essa ação será
          permanente
        </p>
        <RadioGroup
          v-model="type"
          :items="types"
          v-if="appointment.frequency != 'ONCE'"
        />
      </div>
      <div class="flex flex-wrap justify-end gap-sm">
        <Button secondary @click="handleChange(false)">Cancelar</Button>
        <Button @click="handleConfirm">Confirmar</Button>
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
.confirm-text {
  @apply whitespace-normal break-words;
}
</style>
