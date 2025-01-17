<template>
  <div class="container mx-auto">
    <ul>
      <li
        v-for="product in products.products"
        :key="product.id">
        {{ product }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const { data: products, error } = await useFetch('/api/products')

if (error.value) {
  console.error(error.value)
}
</script>

<style></style>
