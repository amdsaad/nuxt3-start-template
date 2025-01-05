export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()

  // The reCAPTCHA script URL depends on v2 or v3
  // Example for reCAPTCHA v2:
  const scriptUrl = `https://www.google.com/recaptcha/api.js?render=${runtimeConfig.public.recaptchaSiteKey}`

  if (!document.querySelector('#recaptcha-script')) {
    const script = document.createElement('script')
    script.id = 'recaptcha-script'
    script.src = scriptUrl
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  }
})
