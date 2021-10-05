import { MongoClient } from "mongodb";

let cachedDb = null

export const dbHandler = async () => {
    if (cachedDb) {
        return cachedDb
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    const db = client.db('share-info')

    cachedDb = db

    return db
}
