<template>
  <Template>
    <div class="unauthorized-holder">
      <iframe src="https://lottie.host/embed/24796d5f-6393-4d22-900a-d46d20ad6d2c/25s3BUDtJk.json" class="w-[300px] h-[300px]"></iframe>
      <div class="text-holder">
        <h2>Acesso Negado</h2>
        <p>Peça para seu administrador te garantir acesso</p>
      </div>
    </div>
  </Template>
</template>

<script lang="ts">

</script>

<style scoped>
.unauthorized-holder {
  @apply flex flex-col items-center justify-center gap-sm text-gray-500 h-full w-full;
}

.text-holder {
  @apply text-center;

  h2 {
    @apply text-20 font-bold text-primary-500;
  }

  p {
    @apply text-16;
  }
}
</style>