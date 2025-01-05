// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    '@nuxtjs/i18n',
    '@dargmuesli/nuxt-cookie-control',
    '@nuxtjs/strapi',
    '@nuxtjs/seo',
  ],
  plugins: ['~/plugins/recaptcha.client.ts'],
  devtools: { enabled: false },
  css: ['~/assets/css/tailwind.css'],
  site: {
    url: '',
    name: '',
    description: '',
    defaultLocale: 'en',
  },
  runtimeConfig: {
    token: process.env.Token,
    recaptchaSecret: process.env.RECAPTCHA_SECRET,
    strapi: {
      url: process.env.STRAPI_URL || 'http://localhost:1337',
    },
    provider: {
      url: process.env.PROVIDER_URL || 'http://localhost:1337',
    },
    public: {
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
      strapi: {
        url: process.env.STRAPI_URL || 'http://localhost:1337',
      },
      provider: {
        url: process.env.PROVIDER_URL || 'http://localhost:1337',
      },
    },
  },
  compatibilityDate: '2024-11-01',
  cookieControl: {
    /**
     * 1) This must match the locale codes you use in Nuxt i18n:
     *    e.g. i18n: { locales: [{ code: 'en' }, { code: 'ar' }] }
     */
    locales: ['en', 'ar'],
    localeTexts: {
      en: {
        bannerTitle: 'Cookies',
        bannerDescription:
          'We use cookies to ensure you get the best experience on our website.',
        accept: 'Accept',
        acceptAll: 'Accept All',
        decline: 'Decline',
        declineAll: 'Decline All',
        manageCookies: 'Learn more and customize',
        close: 'Close',
        save: 'Save',
        settingsUnsaved: 'You have unsaved settings.',
        cookiesFunctional: 'Functional Cookies',
        cookiesNecessary: 'Necessary Cookies',
        cookiesOptional: 'Optional Cookies',
        iframeBlocked: 'Content blocked to protect your privacy.',
        here: 'here',
      },
      ar: {
        bannerTitle: 'ملفات تعريف الارتباط',
        bannerDescription:
          'نستخدم ملفات تعريف الارتباط لضمان حصولك على أفضل تجربة على موقعنا.',
        accept: 'قبول',
        acceptAll: 'قبول الكل',
        decline: 'رفض',
        declineAll: 'رفض الكل',
        manageCookies: 'المزيد من الخيارات والتخصيص',
        close: 'إغلاق',
        save: 'حفظ',
        settingsUnsaved: 'لديك إعدادات غير محفوظة.',
        cookiesFunctional: 'ملفات تعريف الارتباط الوظيفية',
        cookiesNecessary: 'ملفات تعريف الارتباط الضرورية',
        cookiesOptional: 'ملفات تعريف الارتباط الاختيارية',
        iframeBlocked: 'تم حظر المحتوى لحماية خصوصيتك.',
        here: 'هنا',
      },
    },

    /**
     * 3) Other core options from the schema
     */
    barPosition: 'bottom-full', // or 'top-left', 'bottom-right', etc.
    closeModalOnClickOutside: true,
    colors: {
      barTextColor: '#fff',
      barBackground: '#000',
      // You can define more color keys if needed
    },
    cookieNameCookiesEnabledIds: 'ncc_e',
    cookieNameIsConsentGiven: 'ncc_c',

    // Example: no necessary or optional cookies defined (customize as you wish)
    cookies: {
      necessary: [
        {
          // Use the same name as the cookie Nuxt i18n sets
          id: 'i18n_redirected',
          name: { en: 'i18n Redirect', ar: 'تحويل اللغة' },
          description: {
            en: 'Stores the last selected language for this site.',
            ar: 'يخزن اللغة الأخيرة المختارة لهذا الموقع.',
          },
          // No script "src" needed because this cookie is set by Nuxt i18n
          // noAllow: true or disabled: true is implied if it's "necessary"
        },
      ],
      optional: [],
    },
    // Additional switches:
    isAcceptNecessaryButtonEnabled: false,
    isControlButtonEnabled: true,
    isCookieIdVisible: false,
    isCssEnabled: true,
    isCssPonyfillEnabled: false,
    isDashInDescriptionEnabled: false,
    isIframeBlocked: false,
    isModalForced: false,
  },
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
    locales: [{ code: 'en', language: 'en-US' }],
    defaultLocale: 'en',
  },
  image: {
    quality: 80,
    format: ['webp'],
  },
  sitemap: {
    // exclude all URLs that start with /secret
    exclude: [
      '/admin-post/**',
      '/get-access/**',
      '/admin/**',
      '/api/**',
      '/_nuxt/**',
      '/auth/**',
    ],
    sources: ['/api/__sitemap__/urls'],
  },
})
