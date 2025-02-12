<script lang="ts">
import event from "../util/event";

export default {
  name: "Toast",
  setup() {
    return {
      message: ref(""),
      show: ref(false),
      timeout: ref(3000),
      type: ref("error"),
    };
  },
  mounted() {
    event.on("open-alert", this.showAlert);
    event.on("close-alert", this.closeAlert);
  },
  beforeUnmount() {
    event.off("open-alert", this.showAlert);
    event.off("close-alert", this.closeAlert);
  },
  methods: {
    showAlert(options) {
      Object.keys(options).forEach((key: any) => {
        this[key] = options[key];
      });

      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, this.timeout);
    },
    closeAlert() {
      this.show = false;
    }
  },
};
</script>

<template>
  <Transition name="slide-in">
    <Alert v-if="show" class="alert" :type="type" :message="message" toast />
  </Transition>
</template>

<style scoped>
.alert {
  @apply z-[80] fixed w-fit max-w-[50em] right-[16px] top-[16px];
  transition: right 0.6s ease;
}

.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform 0.3s;
}

.slide-in-enter-from,
.slide-in-leave-to {
  transform: translateX(100%);
}

.slide-in-enter-to,
.slide-in-leave-from {
  transform: translateX(0%);
}

@media screen and (max-width: 50em) {
  .alert {
    max-width: 95%;
  }
}
</style>
