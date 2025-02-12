<script>
import { storeToRefs } from 'pinia'
import { authStore } from "~/stores/auth";
import { getInitials } from '~/util';

export default {
  name: "Menu",

  props: {
    modelValue: Boolean,
  },
  emits: ["update:modelValue"],

  setup() {
    const isPhone = ref(false);
    const expanded = ref(false);
    const menu = ref();
    const logout = authStore().logout;

    return {
      isPhone,
      menu,
      expanded,
      getInitials,
      logout,
      ...useAuthorization(),
      ...storeToRefs(authStore()),
    };
  },

  computed: {
    getMenuOption() {
      return this.$route.name;
    },
  
    options() {
      const options = [
        {
          text: "Início",
          value: "index",
          path: "/",
          icon: "home",
        },
        {
          text: "Agenda",
          value: "agenda",
          path: "/agenda",
          icon: "event",
        },
        {
          text: "Pacientes",
          value: "pacients",
          path: "/pacients",
          icon: "diversity_4",
        },
        {
          text: "Remédios",
          value: "medications",
          path: "/medications",
          icon: "medication",
        },
        {
          text: "Doenças",
          value: "diseases",
          path: "/diseases",
          icon: "medical_information",
        },
        {
          text: "Recibos",
          value: "receipts",
          path: "/receipts",
          icon: "receipt",
        },
        {
          text: "Gerar Docs.",
          value: "generate",
          path: "/generate",
          icon: "print_add",
        },
        {
          text: "Usuários",
          value: "users",
          path: "/users",
          icon: "group",
        },
      ];

	    return options.filter((option) => !this.protectedRoutes[option.value] || this.protectedRoutes[option.value].includes(this.user.role))
    },
  },

  beforeMount() {
    window.addEventListener("resize", this.handleResize);
  },

  mounted() {
    this.handleResize();
    this.expanded = ref(!this.isPhone);
    this.changeExpanded(this.expanded);
    this.changeHeight(false);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },

  watch: {
    modelValue() {
      this.expanded = this.modelValue;
      this.changeHeight(false);
    },
  },

  methods: {
    handleResize() {
      this.isPhone = window?.innerWidth <= 768;
      if (this.isPhone) {
        this.changeExpanded(false);
        this.menu.style.height = "0";
      } else {
        this.menu.style.height = "100vh";
      }
    },
  
    changeExpanded(value) {
      this.expanded = value;
      this.$emit("update:modelValue", value);
    },

    changeHeight(emit = true) {
      if (!this.isPhone) return;

      if (emit) this.changeExpanded(!this.expanded);

      let height = "0";
      if (this.expanded) {
        const topbar = document.querySelector(".top-holder");
        const windowHeight = window.innerHeight;
        height = windowHeight - topbar.scrollHeight;
      }
      this.menu.style.height = `${height}px`;
    },
  },
};
</script>

<template>
  <div class="menu" ref="menu" :class="{ closed: !expanded, mobile: isPhone }">
    <div class="flex flex-col gap-2xl w-full">
      <NuxtLink
        class="account option"
        to="/profile"
        @click="isPhone && changeHeight()"
      >
        <div class="account-photo">
          <h3 class="my-sm m-base">{{ getInitials(user.name) }}</h3>
        </div>
        <div class="account-info" v-if="expanded">
          <h4 class="text-12 font-bold truncate">
            {{ user.name }}
          </h4>
          <p class="text-8 italic">{{ roles[user.role] }}</p>
        </div>
      </NuxtLink>
      <div class="flex flex-col gap-sm">
        <NuxtLink
          @click="isPhone && changeHeight()"
          class="option"
          :class="{
            active: option.value.includes(getMenuOption) || getMenuOption.includes(option.value),
            'justify-center': !expanded && !isPhone,
          }"
          v-for="option in options"
          :key="option.value"
          :to="option.path"
        >
          <Icon :name="option.icon" />
          <span v-if="expanded">{{ option.text }}</span>
        </NuxtLink>
      </div>
    </div>
    <div class="flex flex-col w-full gap-sm border-t-1 border-gray-300 pt-xs">
      <div class="option" @click="logout">
        <Icon name="logout" />
        <span v-if="expanded">Sair</span>
      </div>
      <div
        class="option arrow"
        :class="{ 'rotate-180': expanded }"
        v-if="!isPhone"
      >
        <Icon @click="changeExpanded(!expanded)" name="chevron_right" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu {
  @apply sticky flex flex-col justify-between items-start bottom-0 left-0 min-w-[200px] max-w-[200px] h-screen shadow-normal overflow-hidden select-none bg-white p-xl;
  transition: min-width 0.5s ease, width 0.5s ease, max-width 0.5s ease;
}

.menu.closed {
  @apply min-w-0 w-fit max-w-[100px];

  .option.account {
    @apply p-0;
  }
}

.menu.mobile {
  @apply z-40 fixed min-w-full max-w-full;
  transition: height 0.5s ease, padding 0.5s ease;
}

.menu.mobile.closed {
  @apply h-0 p-0;
}

.option {
  @apply flex items-center gap-xs py-sm px-base cursor-pointer rounded-8 text-gray-400 select-none font-bold text-12 hover:bg-gray-100;
}

.option.active {
  @apply bg-primary-100 text-primary-500 hover:bg-primary-100;
}

.option.arrow {
  @apply ease-in-out duration-300 cursor-pointer text-gray-400 rounded-full w-fit pr-xs;
}

.option.account {
  @apply gap-sm text-gray-500 hover:bg-primary-100 hover:text-primary-500;
}

.account-photo {
  @apply flex items-center justify-center text-16 text-white bg-primary-500 rounded-8 min-w-[40px] min-h-[36px];
}

.account-info {
  @apply flex-1 min-w-0 overflow-hidden;
}

.icon {
  @apply text-24;
}
</style>
