// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2024-11-01',
  eslint: {
    config: {
      stylistic: true,
    },
    checker: true,
  },
  fonts: {
    families: [
      {
        name: 'Inter',
        weights: [300, 400, 500, 600, 700, 800, 900],
        styles: ['normal'],
        provider: 'google',
      },
    ],
  },
  image: {
    quality: 80,
    format: ['webp'],
  },

})
