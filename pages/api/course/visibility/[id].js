import {connectToDatabase} from "../../db/mongodb";
import {ObjectId} from "mongodb";

export default async (request, response) => {
    const {
        method,
        query: { id },
        body: { visibility }
    } = request

    const { db } = await connectToDatabase();

    const collection = db.collection('courses')

    switch (method) {
        case 'PATCH':
            await collection.updateOne(
                { _id: ObjectId(id) },
                { $set: { visibility: !visibility, updateAt: new Date() } }
            )
            return response
                .status(204)
                .json({ message: 'A visibilidade do curso foi alterada' })
        default:
            response.setHeader('Allow', ['GET'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
