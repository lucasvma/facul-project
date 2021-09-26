import {MongoClient} from 'mongodb'
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
    const {
        method,
        body: { title, description, publicClass }
    } = request

    const db = await connectToDatabase(process.env.MONGODB_URI)

    const collection = db.collection('classes')

    switch (method) {
        case 'GET':
            const classes = await collection.find().toArray()

            return response
                    .status(200)
                    .json({ classes })
        case 'POST':
            await collection.insertOne({
                title,
                description,
                publicClass,
                createdAt: new Date()
            })

            return response
                .status(201)
                .json({ message: 'A Aula foi cadastrada com sucesso' })
        default:
            response.setHeader('Allow', ['GET', 'POST', 'PUT'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
