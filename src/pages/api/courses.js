import { MongoClient } from 'mongodb'
import url from 'url'

let cachedDb = null

const connectToDatabase = async (uri) => {
    if (cachedDb) {
        return cachedDb
    }

    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    const dbName = url.parse(uri).pathname.substr(1)

    const db = client.db(dbName)

    cachedDb = db

    return db
}

export default async (request, response) => {
    const { title, description } = request.body

    const db = await connectToDatabase(process.env.MONGODB_URI)

    const collection = db.collection('courses')

    await collection.insertOne({
        title,
        description,
        createdAt: new Date()
    })

    return response
        .status(201)
        .json({ message: 'O Curso foi cadastrado com sucesso' })
}
