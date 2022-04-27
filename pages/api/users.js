import {connectToDatabase} from "./db/mongodb";

export default async (request, response) => {
    const {
        method,
    } = request

    const {db} = await connectToDatabase();

    const collection = await db.collection('users')

    switch (method) {
        case 'GET':
            const users = await collection.find().toArray()

            return response
                .status(200)
                .json({users})
        default:
            response.setHeader('Allow', ['GET'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
