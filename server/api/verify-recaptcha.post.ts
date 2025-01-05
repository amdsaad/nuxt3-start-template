export default defineEventHandler(async (event) => {
  const { token } = await readBody(event)
  const config = useRuntimeConfig()

  if (!token) {
    throw new Error('Missing reCAPTCHA token.')
  }

  // Make a POST request to Google's verify endpoint
  // v3 docs: https://developers.google.com/recaptcha/docs/verify
  const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify'
  const data = await $fetch(verifyUrl, {
    method: 'POST',
    query: {
      secret: config.recaptchaSecret,
      response: token,
    },
  }) as any

  // data.success tells if verification passed
  if (!data.success) {
    // You can check data['error-codes'] for details
    return { success: false, error: data['error-codes'] }
  }

  // Optionally check score, action, etc. (for v3)
  // data.score, data.action, etc.

  // If everything is good, proceed
  return { success: true }
})
