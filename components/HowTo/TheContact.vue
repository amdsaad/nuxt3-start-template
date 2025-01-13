<template>
  <div>
    <div class="container min-h-[50vh] flex items-center">
      <div class="w-full grid grid-cols-1 lg:grid-cols-2">
        <form @submit.prevent="handleSubmit">
          <p>form elements here</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()

const handleSubmit = () => {
  if (!window.grecaptcha) {
    console.error('reCAPTCHA script is not loaded yet.')
    return
  }

  window.grecaptcha.ready(() => {
    window.grecaptcha
      .execute(config.public.recaptchaSiteKey, { action: 'submit_form' })
      .then((token) => {
        console.log('Got reCAPTCHA token:', token)
        // Typically, you send this token to your server for verification
        verifyToken(token)
      })
      .catch((err) => {
        console.error('reCAPTCHA execution failed:', err)
      })
  })
}
async function verifyToken(token) {
  try {
    const response = await $fetch('/api/verify-recaptcha', {
      method: 'POST',
      body: { token },
    })
    if (response.success) {
      // reCAPTCHA verification was successful
      console.log('reCAPTCHA verified on the server!')
    } else {
      console.error(
        'reCAPTCHA verification failed on the server:',
        response.error
      )
    }
  } catch (error) {
    console.error('Error calling /api/verify-recaptcha:', error)
  }
}

// const validateEmail = (email) => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//   return emailRegex.test(email)
// }
</script>
