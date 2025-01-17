export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('authToken').value

  if (!token && to.path !== '/login' && to.path !== '/register') {
    return navigateTo('/login')
  }
})
