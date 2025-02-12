<template>
  <div class="printable-template">
    <div class="template-item template-content">
      <header>
        <img :src="logo" alt="logo" class="logo" />
      </header>
      <main>
        <div class="content">
          <h2 class="template-title">{{ title }}</h2>
          <slot />
        </div>
        <p class="flex items-end justify-end">
          <b>Assinatura:</b>
          <svg width="100%" height="1">
            <line x1="0" y1="1" x2="100%" y2="1" stroke="currentColor" stroke-width="1" />
          </svg>
        </p>
      </main>
      <footer>
        <svg height="40" width="400">
          <text font-size="14px" y="25" x="30" fill="#ffffff" >
            {{ address }}
          </text>
        </svg>
      </footer>
    </div>
    <div class="template-item absolute">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#14C981"
          fill-opacity="1"
          d="M0,288L60,282.7C120,277,240,267,360,272C480,277,600,299,720,304C840,309,960,299,1080,277.3C1200,256,1320,224,1380,208L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#14C981"
          fill-opacity="1"
          d="M0,192L80,170.7C160,149,320,107,480,101.3C640,96,800,128,960,133.3C1120,139,1280,117,1360,106.7L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import logoName from "~/assets/icons/logoName.svg";
import { authStore } from "~/stores/auth";

export default {
  name: "PrintTemplate",

  props: {
    title: String,
  },

  setup() {
    return {
      logo: logoName,
      ...authStore(),
    };
  },

  mounted() {
    this.$nextTick(() => {
      window.print();
    });
  },

  computed: {
    address() {
      const address = this.user.address;
      return `${address.street}, ${address.number}${
        address.complement ? `, ${address.complement}` : ""
      } - ${address.neighborhood} - ${address.city}`;
    },
  },
};
</script>

<style scoped>

.printable-template {
  @apply flex flex-col h-full w-full bg-white relative max-w-[700px];
}

.template-item {
  @apply flex flex-col justify-between h-full w-full;
}

.template-content {
  @apply justify-center relative z-[1] py-xl px-lg text-14;

  b {
    @apply text-gray-500;
  }
}

.template-content header,
.template-content footer {
  @apply flex flex-col items-center text-white;
}

.template-content header {
  @apply h-[150px] mt-base;
}

.template-content footer {
  @apply h-[114px] justify-end;
}

main {
  @apply flex flex-col gap-base justify-between flex-1;
}

.content {
  @apply flex flex-col gap-base;
}

.template-title {
  @apply text-24 font-bold text-primary-500;
}

.logo {
  @apply h-[60%];
}

@media print {
  -webkit-print-color-adjust: exact;

  body * {
    visibility: hidden;
  }

  .printable-template, .printable-template * {
    visibility: visible;
  }

  .printable-template {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>