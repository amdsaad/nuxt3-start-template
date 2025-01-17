import type { Db } from 'mongodb'
import { MongoClient } from 'mongodb'

import type { User } from '../types/user'

let client: MongoClient | null = null
let db: Db | null = null
const uri = process.env.MONGODB_URI as string

export const connectToDatabase = async () => {
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables')
  }
  if (!process.env.MONGODB_DB) {
    throw new Error('MONGODB_DB is not defined in environment variables')
  }
  if (!client) {
    client = new MongoClient(uri)
    await client.connect()
    db = client.db(process.env.MONGODB_DB)
  }
  return { client, db }
}
export const getUsersCollection = async () => {
  const { db } = await connectToDatabase()
  if (!db) {
    throw new Error('Database connection is not established')
  }
  return db.collection<User>('users')
}
