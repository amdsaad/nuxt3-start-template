import { connectToDatabase } from '../../utils/mongodb'
import type { Product } from '../../types/product'

export default defineEventHandler(async (event) => {
  const { db } = await connectToDatabase()
  event.node.res.setHeader('Cache-Control', 'no-store')

  try {
    const products = await db.collection<Product>('products').find().toArray()
    return products
  } catch (error) {
    console.error('Failed to fetch products:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch products',
    })
  }
})
