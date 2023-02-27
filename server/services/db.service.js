import { MongoClient } from 'mongodb'

var dbConn = null

export default async function getCollection(collectionName) {
  try {
    const db = await connect()
    const collection = await db.collection(collectionName)
    return collection
  } catch (err) {
    console.error('Failed to get Mongo collection', err)
    throw err
  }
}

async function connect() {
  if (dbConn) return dbConn
  try {
    const client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    const db = client.db(process.env.DB_NAME)
    dbConn = db
    return db
  } catch (err) {
    console.error('Cannot Connect to DB', err)
    throw err
  }
}
