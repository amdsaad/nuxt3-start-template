import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as yup from 'yup'

import { getUsersCollection } from '../../../utils/mongodb'
import { loginSchema } from '../../../schemas/authSchemas'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // Validate input
    const validatedData = await loginSchema.validate(body)

    const { email, password } = validatedData

    const usersCollection = await getUsersCollection()
    const user = await usersCollection.findOne({ email })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw createError({
        statusCode: 400,
        message: 'Invalid email or password.',
      })
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1h',
      }
    )

    setCookie(event, 'authToken', token, { httpOnly: true, maxAge: 3600 })

    return { message: 'Login successful!' }
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return {
        statusCode: 400,
        message: 'Validation failed',
        errors: error.errors,
      }
    }
    throw error
  }
})
