// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/image','@pinia/nuxt'],
  devtools: { enabled: true },
  compatibilityDate: '2024-11-01',
  eslint: {
    config: {
      stylistic: true,
    },
    checker: true,
  },
  image: {
    quality: 80,
    format: ['webp'],
  },

})
