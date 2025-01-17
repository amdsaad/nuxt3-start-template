export interface User {
  _id?: string // MongoDB auto-generates this field
  email: string
  password: string
  name: string
  createdAt: Date
}
