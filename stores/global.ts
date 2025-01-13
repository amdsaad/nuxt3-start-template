import { defineStore } from 'pinia'

export const useMyGlobalStore = defineStore('global', () => {
  const count = ref(0)
  const increment = () => {
    count.value++
  }

  return {
    count,
    increment,
  }
})
