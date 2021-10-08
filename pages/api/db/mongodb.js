import { MongoClient } from "mongodb";

const { MONGODB_URI, MONGODB_DB } = process.env

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    )
}

if (!MONGODB_DB) {
    throw new Error(
        'Please define the MONGODB_DB environment variable inside .env.local'
    )
}

let cachedDb = global.mongo

if (!cachedDb) {
    cachedDb = global.mongo = { conn: null, promise: null }
}

export async function connectToDatabase() {
    if (cachedDb.conn) {
        return cachedDb.conn
    }

    if (!cachedDb.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology : true
        }

        cachedDb.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
            return {
                client,
                db: client.db(MONGODB_DB),
            }
        })
    }
    cachedDb.conn = await cachedDb.promise

    return cachedDb.conn
}
