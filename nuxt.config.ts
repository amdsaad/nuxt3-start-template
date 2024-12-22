// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    '@nuxtjs/i18n',
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
  i18n: {
    locales: [
      { code: 'en', language: 'en-US' },
    ],
    defaultLocale: 'en',
  },
  image: {
    quality: 80,
    format: ['webp'],
  },
})
