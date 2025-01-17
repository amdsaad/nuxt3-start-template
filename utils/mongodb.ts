import { MongoClient } from 'mongodb'

export const connectToDatabase = async () => {
  const uri = process.env.MONGODB_URI as string
  const dbName = process.env.MONGODB_DB

  const client = new MongoClient(uri)

  try {
    // Connect to the MongoDB cluster
    await client.connect()

    // Access the specified database
    const db = client.db(dbName)

    return { client, db }
  } catch (error) {
    console.error('Failed to connect to MongoDB', error)
    throw error
  }
}
