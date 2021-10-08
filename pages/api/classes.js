import { connectToDatabase } from "./db/mongodb";

export default async (request, response) => {
    const {
        method,
        body: { title, description, publicClass }
    } = request

    const { db } = await connectToDatabase();

    const collection = await db.collection('classes')

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
