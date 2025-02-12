import { defineNuxtPlugin } from "#app";
import { createPinia } from 'pinia'
import { useEvents } from "../composables/useEvents";

export default defineNuxtPlugin((nuxtApp) => {
    const pinia = createPinia()
    nuxtApp.vueApp.use(pinia)
  
    nuxtApp.provide("confirm", useEvents().confirm);
    nuxtApp.provide("alert", useEvents().alert);
});
