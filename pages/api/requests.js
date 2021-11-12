import { connectToDatabase } from "./db/mongodb";

export default async (request, response) => {
    const {
        method,
    } = request

    const { db } = await connectToDatabase();

    const collection = await db.collection('requests')

    switch (method) {
        case 'GET':
            const requests = await collection.find().toArray()

            return response
                    .status(200)
                    .json({ requests })
        default:
            response.setHeader('Allow', ['GET'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
