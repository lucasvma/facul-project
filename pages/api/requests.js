import {connectToDatabase} from "./db/mongodb";
import {getSession} from "next-auth/client";

export default async (request, response) => {
    const {
        method,
    } = request

    const {db} = await connectToDatabase();
    const collection = await db.collection('requests')
    const session = await getSession({ req: request })

    switch (method) {
        case 'GET':
            const requests = session.isAdmin ? await collection.find().toArray() : []

            return response
                .status(200)
                .json({requests})
        default:
            response.setHeader('Allow', ['GET'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
