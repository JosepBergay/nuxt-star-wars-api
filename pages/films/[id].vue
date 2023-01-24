<script setup lang="ts">
// import { definePageMeta } from 'nuxt/dist/pages/runtime';

defineProps<{ id?: number }>();

// definePageMeta({
//     middleware: 'films'
// })

const appConfig = useAppConfig();
const route = useRoute();

const { pending, data: film } = useLazyFetch<{
  director: string;
  producer: string;
  opening_crawl: string;
  title: string;
}>(`${appConfig.SW_API}/films/${route.params.id}`);
</script>

<template>
  <div class="details-content" v-if="!pending && film">
    <span>Title: {{ film.title }}</span>
    <span>Director: {{ film.director }}</span>
    <span>Producer: {{ film.producer }}</span>
    <p>{{ film.opening_crawl }}</p>
    <!-- <pre>{{ film }}</pre> -->
  </div>
</template>

<style>
.details-content {
  display: flex;
  flex-direction: column;
  padding: 20px;
}
</style>
