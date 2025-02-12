<script lang="ts">
import { storeToRefs } from 'pinia'
import { authStore } from "~/stores/auth";

export default {
  name: "Template",

  props: {
    modelValue: Boolean,
    formLoading: Boolean,
    title: String,
    createPath: String,
    formTitle: String,
  },
  emits: ["update:modelValue", "save"],

  setup() {
    return {
      expanded: ref(false),
      isPhone: ref(false),
      showSidebar: ref(false),
      isFormLoading: ref(false),
      topbar: ref(null),
      ...storeToRefs(authStore())
    };
  },

  watch: {
    modelValue() {
      this.showSidebar = this.modelValue;
    },
  },

  beforeMount() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },

  created() {
    this.showSidebar = this.modelValue;
  },

  methods: {
    changeExpanded() {
      this.expanded = !this.expanded;
    },

    changeSidebarState(value: boolean) {
      this.showSidebar = value;
      this.$emit('update:modelValue', value);
    },

    handleResize() {
      this.isPhone = window?.innerWidth <= 768;
    },

    create() {
      if (this.$slots.form) this.changeSidebarState(true);
      else this.$router.push(`/${this.createPath}`)
    },

    save() {
      this.$emit('save');
    }
  },
}
</script>

<template>
  <div class="flex h-screen" v-if="!loading">
    <Menu v-model="expanded" />
    <div class="content-holder">
      <div ref="topbar" class="top-holder" v-if="title || isPhone">
        <Icon class="cursor-pointer" :name="expanded ? 'close' : 'menu'" @click="changeExpanded" v-if="isPhone" />
        <h1 class="title">{{ title }}</h1>
        <RoundButton :size="isPhone ? 'small' : 'medium'" @click="create" v-if="createPath || $slots.form" />
      </div>
      <div class="content" :style="{ height: `calc(100vh - ${topbar?.clientHeight || 0}px - 80px)` }">
        <slot />
        <Sidebar v-model="showSidebar" :loading="formLoading" :title="formTitle" @save="save" @update:model-value="changeSidebarState" v-if="$slots.form">
          <template #actions>
            <slot name="form-actions" />
          </template>
          <slot name="form" />
        </Sidebar>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-holder {
  @apply flex flex-col w-full h-screen px-[40px] py-[30px] overflow-auto;
}

.top-holder {
	@apply flex items-center gap-sm mb-xl;
}

.icon {
  @apply text-20 text-gray-500;
}

.title {
  @apply text-24 font-bold text-gray-500;
}

.content {
  @apply flex-1;
}

@media screen and (max-width: 768px) {
  .content-holder {
    @apply p-0;
  }

	.top-holder {
		@apply sticky z-20 w-full top-0 bg-white p-lg;
	}

  .title {
    @apply text-16;
  }

  .top-holder {
    @apply mb-0;
  }

  .content {
    @apply p-3xl;
  }
}
</style>