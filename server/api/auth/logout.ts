export default defineEventHandler(async (event) => {
  deleteCookie(event, 'authToken')
  return { message: 'Logout successful!' }
})
