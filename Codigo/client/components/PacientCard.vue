<template>
  <Card class="pacient-card">
    <div class="flex justify-between flex-wrap-reverse gap-base">
      <h1 class="text-14 font-bold">{{ pacient.name }}</h1>
      <div class="actions" v-if="user.role == 'admin'">
        <RoundButton icon="edit" size="small" @click="$emit('edit', pacient)" />
        <RoundButton
          icon="delete"
          size="small"
          @click="$emit('delete', pacient)"
        />
      </div>
    </div>
    <div>
      <p>Idade: {{ age }}</p>
      <p>Signo: {{ signs[pacient.sign] }}</p>
    </div>
  </Card>
</template>
<script lang="ts">
import { authStore } from '~/stores/auth';

export default {
  name: "Usercard",

  props: {
    pacient: {
      name: String,
      birthDate: String,
      sign: String,
    },
  },
  emits: ["edit", "delete"],

  setup() {
    return {
      ...usePacients(),
      ...authStore(),
    };
  },

  computed: {
    age() {
      if (this.pacient.birthDate) {
        const birthDate = new Date(this.pacient.birthDate);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - birthDate.getFullYear();
        return age;
      }
      return;
    },
  },
};
</script>

<style scoped>
.pacient-card.card {
  @apply flex flex-col gap-xs flex-1 border-l-[24px] border-primary-500 text-gray-500 text-12 p-lg;
}

.actions {
    @apply flex gap-xs;
}
</style>
