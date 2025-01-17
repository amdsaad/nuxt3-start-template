import { connectToDatabase } from '../../utils/mongodb'

export default defineEventHandler(async (event) => {
  const { db } = await connectToDatabase()
  event.node.res.setHeader('Cache-Control', 'no-store')

  try {
    const collection = db.collection('products')
    const products = await collection.find({}).limit(10).toArray()
    return { products }
  } catch (error) {
    console.error('Failed to fetch products:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch products',
    })
  }
})
