import { MongoClient } from "mongodb";

let cachedDb = null

export const dbHandler = async () => {
<<<<<<< HEAD
    let uri = process.env.MONGODB_URI

=======
>>>>>>> master
    if (cachedDb) {
        return cachedDb
    }

<<<<<<< HEAD
    const client = await MongoClient.connect(uri, {
=======
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
>>>>>>> master
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    const db = client.db('share-info')

    cachedDb = db

    return db
}
