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
        query: { id },
        body: { title, description }
    } = request

    console.log('there')

    const db = await connectToDatabase(process.env.MONGODB_URI)

    const collection = db.collection('classes')

    switch (method) {
        case 'GET':
            const grade = await collection.find({ _id: id }).toArray()

            response
                .status(200)
                .json({ grade })
            break
        case 'PUT':
            // await collection.insertOne({
            //     title,
            //     description,
            //     createdAt: new Date()
            // })
            //
            // return response
            //     .status(201)
            //     .json({ message: 'A Aula foi cadastrada com sucesso' })
            // break
        default:
            response.setHeader('Allow', ['GET', 'POS', 'PUT'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
