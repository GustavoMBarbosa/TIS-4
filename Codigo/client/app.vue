<template>
    <Confirm />
    <Toast />
    <NuxtPage />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import syncData from './util/sync';

function handleOnline() {
    console.log('App is online');
    syncData();
}

function handleOffline() {
    console.log('App is offline');
}

onMounted(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
});

onUnmounted(() => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
});
</script>
