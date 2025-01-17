import bcrypt from 'bcrypt'
import * as yup from 'yup'
import { getUsersCollection } from '../../../utils/mongodb'
import { registerSchema } from '../../../schemas/authSchemas'
import type { User } from '../../../types/user'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // Validate input
    const validatedData = await registerSchema.validate(body, {
      abortEarly: false,
    })

    const { email, password, name } = validatedData

    const usersCollection = await getUsersCollection()
    const existingUser = await usersCollection.findOne({ email })

    if (existingUser) {
      throw createError({
        statusCode: 400,
        message: 'Email already exists',
        data: ['Email already exists'],
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser: User = {
      email,
      password: hashedPassword,
      name,
      createdAt: new Date(),
    }

    await usersCollection.insertOne(newUser)

    return { message: 'User registered successfully!', statusCode: 201 }
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      throw createError({
        statusCode: 400,
        message: 'Validation error',
        data: error.errors,
      })
    }
    throw error
  }
})
