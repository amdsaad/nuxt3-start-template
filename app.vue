<template>
  <div>
    <NuxtLayout>
      <CookieControl :locale="locale" />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
</script>
