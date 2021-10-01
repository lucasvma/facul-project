import { MongoClient } from "mongodb";

let cachedDb = null

export const dbHandler = async () => {
    let uri = process.env.MONGODB_URI

    if (cachedDb) {
        return cachedDb
    }

    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    const db = client.db('share-info')

    cachedDb = db

    return db
}
