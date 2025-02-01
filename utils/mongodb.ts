import type { Db } from 'mongodb'
import { MongoClient } from 'mongodb'

import type { User } from '../types/user'

const uri = process.env.MONGODB_URI as string
const dbName = process.env.MONGODB_DB as string

if (!uri) {
  throw new Error('MONGODB_URI is not defined in environment variables')
}
if (!process.env.MONGODB_DB) {
  throw new Error('MONGODB_DB is not defined in environment variables')
}

declare global {
  interface GlobalThis {
    _mongoClientPromise?: Promise<MongoClient>
  }
}

let client: MongoClient
let db: Db

export const connectToDatabase = async () => {
  if (!globalThis._mongoClientPromise) {
    client = new MongoClient(uri)
    globalThis._mongoClientPromise = client.connect()
  }

  client = await globalThis._mongoClientPromise
  db = client.db(dbName)

  return { client, db }
}

export const getUsersCollection = async () => {
  const { db } = await connectToDatabase()
  if (!db) {
    throw new Error('Database connection is not established')
  }
  return db.collection<User>('users')
}
