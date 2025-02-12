<template>
  <div ref="actionHolder" class="action-holder">
    <div class="more-actions" :class="{'active': model}" @click="showCard">
      <Icon name="more_vert" />
    </div>
    <Card ref="card" class="action-card" v-show="model">
      <div class="action" @click="$emit('edit', item)">
        <Icon name="edit" />
        Editar
      </div>
      <div v-for="option in items" :key="option.label" class="action" @click="option.action(item)">
        <Icon :name="option.icon" />
        {{ option.label }}
      </div>
      <div v-if="!hideDelete" class="action delete" @click="$emit('delete', item)">
        <Icon name="delete" />
        Deletar
      </div>
    </Card>
  </div>
</template>

<script lang="ts">
export default {
  name: "ActionCard",

  props: {
    modelValue: Boolean,
    hideDelete: Boolean,
    item: [Array, Object, String, Number, Boolean],
    items: {
      type: Array as any,
      default: () => [],
    },
  },
  emits: ["update:modelValue", "edit", "delete"],

  setup() {
    return {
      model: ref(false),
      actionHolder: ref(),
      actionCard: ref(),
    }
  },

  watch: {
    modelValue() {
      this.model = this.modelValue;
    }
  },

  created() {
    this.model = this.modelValue;
  },

  mounted() {
    document.addEventListener('click', this.onBlur);
  },

  beforeUnmount() {
    document.removeEventListener('click', this.onBlur);
  },
  
  methods: {
    updateModel(value: boolean) {
      this.model = value;
      this.$emit('update:modelValue', value)
    },

    showCard() {
      this.updateModel(!this.model)
      if (!this.model || !this.$refs.card) return;

      const card = (this.$refs.card as any).$el as HTMLElement;
			const rect = card.parentElement?.getBoundingClientRect();
      if (!rect) return;

			setTimeout(() => {
				const windowHeight = window.innerHeight;
				const cardHeight = card.offsetHeight;
        const top = rect.top + 25;
        const left = rect.left - card.offsetWidth + 9;
				const height = top + cardHeight;
				card.style.left = left + 'px';
				if (height > windowHeight) {
          // @ts-ignore
					delete card.style.top;
					card.style.bottom = '0';
				} else {
					card.style.top = top + 'px';
				}
			}, 10);
    },

    onBlur(event: MouseEvent) {
      if (!event.target || !(event.target instanceof Element)) return;
      const element = event.target.closest('.action-holder');
      if (element != this.actionHolder) this.updateModel(false);
    }
  }
};
</script>

<style scoped>
.more-actions {
  @apply flex items-center w-fit cursor-pointer p-xxs rounded-full text-gray-500 hover:bg-gray-100;

  .icon {
    @apply text-18;
  }
}

.action-card {
  @apply z-30 fixed flex flex-col gap-xxs p-base w-fit;
}

.more-actions.active {
  @apply bg-primary-500 text-white;
}

.action {
  @apply flex items-center gap-xs px-base py-sm rounded-8 text-gray-500 text-12 font-bold cursor-pointer hover:bg-gray-100;

  .icon {
    @apply text-16;
  }
}

.action.delete {
  @apply text-red-500 hover:bg-red-100;
}
</style>
