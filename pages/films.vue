<script setup lang="ts">
import { Ref } from "vue";

const appConfig = useAppConfig();
const { pending, data: films } = useLazyAsyncData("films", () =>
  $fetch<{ results: { episode_id: number; title: string }[] }>(
    `${appConfig.SW_API}/films`
  ).then((res) =>
    res.results.map((r) => ({ id: r.episode_id, title: r.title }))
  )
);

const someErrorLogger = (error: unknown) => {
  console.error("OH NOES!", error);
};

const route = useRoute();
const activeIdx = computed(() =>
  films.value?.findIndex((f) => f.id === +route.params.id)
);

watch(
  () => route.params,
  (v) => console.log("params", v)
);

const fixError = (error: Ref<unknown>) => {
  error.value = null;
  clearError({ redirect: "/films" });
};

const getNext = () => {
  if (typeof activeIdx.value === "undefined" || !films.value?.length) return "";

  return ((+route.params.id + 1) % films.value.length) + 1;
};

const getPrev = () => {
  if (typeof activeIdx.value === "undefined" || !films.value?.length) return "";

  return ((+route.params.id - 1) % films.value.length) + 1;
};
</script>

<template>
  <div>
    <h1>Films</h1>
    <h2 v-if="pending">Loading films</h2>
    <div class="area" v-if="!pending">
      <ul>
        <li v-for="(film, idx) of films">
          <NuxtLink :to="`/films/${idx + 1}`">
            {{ film.title }}
          </NuxtLink>
        </li>
      </ul>
      <div class="details">
        <div class="details-header">
          <NuxtLink :to="`/films/${getPrev()}`" v-if="!!films?.length">
            <span> &lt;&lt; </span>
          </NuxtLink>
          <span>{{
            typeof activeIdx === "number" && films?.[activeIdx+1]
              ? films?.[activeIdx+1].title
              : !films?.length
              ? "No films :<"
              : "Pick a film"
          }}</span>
          <NuxtLink :to="`/films/${getNext()}`" v-if="!!films?.length">
            <span> &gt;&gt;</span>
          </NuxtLink>
        </div>
        <NuxtErrorBoundary @error="someErrorLogger">
          <NuxtPage :id="activeIdx" />
          <template #error="{ error }">
            Error:
            <p>{{ error }}</p>
            <button @click="fixError(error)">Fix Error</button>
          </template>
        </NuxtErrorBoundary>
      </div>
    </div>
  </div>
</template>

<style>
.area {
  display: flex;
  width: 100%;
}
.area > ul {
  width: 20%;
  flex-grow: 1;
  /* background-color: teal; */
}
.details {
  display: flex;
  flex-direction: column;
  width: 80%;
  /* background-color: aliceblue; */
}
.details-header {
  display: flex;
  justify-content: space-around;
  width: 100%;
  /* background-color: antiquewhite; */
}
.active-film {
  background-color: teal;
}
</style>
