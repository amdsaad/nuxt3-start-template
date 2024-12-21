<template>
  <div>
    {{ store.count }}
    <button @click="store.increment">
      +
    </button>
  </div>
</template>

<script setup lang="ts">
import { useMyGlobalStore } from '~/stores/global'

const store = useMyGlobalStore()
</script>
