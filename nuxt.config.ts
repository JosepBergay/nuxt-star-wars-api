// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    shim: false,
    strict: true,
  },
  appConfig: {
    SW_API: 'https://swapi.dev/api'
  },
});
