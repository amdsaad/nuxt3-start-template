<template>
  <form
    class="space-y-4 md:space-y-6"
    @submit.prevent="register">
    <div>
      <label
        for="name"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Your Name</label
      >
      <input
        id="name"
        v-model="name"
        type="text"
        name="name"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="John Doe"
        required />
      <span
        v-if="errors.name"
        class="text-red-500 text-sm"
        >{{ errors.name }}</span
      >
    </div>
    <div>
      <label
        for="email"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Your email</label
      >
      <input
        id="email"
        v-model="email"
        type="email"
        name="email"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="name@company.com"
        required />
      <span
        v-if="errors.email"
        class="text-red-500 text-sm"
        >{{ errors.email }}</span
      >
    </div>
    <div>
      <label
        for="password"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Password</label
      >
      <input
        id="password"
        v-model="password"
        type="password"
        name="password"
        placeholder="••••••••"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required />
      <span
        v-if="errors.password"
        class="text-red-500 text-sm"
        >{{ errors.password }}</span
      >
    </div>
    <button
      type="submit"
      class="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
      Create an account
    </button>
  </form>
</template>

<script setup lang="ts">
import { registerSchema } from '~/schemas/authSchemas'

const name = ref('')
const email = ref('')
const password = ref('')
const errors = reactive({ name: '', email: '', password: '' }) as any

const validateForm = async () => {
  try {
    // Clear previous errors
    Object.keys(errors).forEach((key: string) => (errors[key] = ''))
    // Validate input
    await registerSchema.validate(
      { name: name.value, email: email.value, password: password.value },
      { abortEarly: false }
    )
    return true
  } catch (err: any) {
    if (err.inner) {
      // Map Yup errors to the `errors` object
      err.inner.forEach((validationError: any) => {
        errors[validationError.path as keyof typeof errors] =
          validationError.message
      })
    }
    return false
  }
}

const register = async () => {
  if (await validateForm()) {
    const { data, error } = await useFetch('/api/auth/register', {
      method: 'POST',
      body: {
        name: name.value,
        email: email.value,
        password: password.value,
      },
    })
    if (error.value) {
      if (error.value.statusCode === 400) {
        if (
          error.value.data?.data?.length &&
          error.value.data.data.includes('Email already exists')
        ) {
          errors.email = 'Oh, this Email already exists'
        }
      } else {
        throw createError({
          statusCode: error.value.statusCode,
          message: error.value.message,
        })
      }
    }
    if (data.value) {
      navigateTo('/auth/login')
    }
  }
}
</script>
