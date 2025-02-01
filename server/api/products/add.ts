import { connectToDatabase } from '../../../utils/mongodb'
import { productSchema } from '../../../schemas/product'
import type { Product } from '../../../types/product'

export default defineEventHandler(async (event) => {
  // Parse the request body to get product details
  const body = await readBody(event)

  // Validate the input data against the Yup schema
  try {
    await productSchema.validate(body)
  } catch (error: any) {
    throw createError({ statusCode: 400, statusMessage: error.message })
  }

  // Connect to the database
  const { db } = await connectToDatabase()

  // Insert the new product into the database
  const result = await db.collection<Product>('products').insertOne(body)

  return { success: result.acknowledged, id: result.insertedId }
})
