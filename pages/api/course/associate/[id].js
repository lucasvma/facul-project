import {connectToDatabase} from "../../db/mongodb";
import {ObjectId} from "mongodb";

export default async (request, response) => {
    const {
        method,
        query: {id},
        body: {classes}
    } = request

    const {db} = await connectToDatabase();

    const collection = db.collection('courses')

    switch (method) {
        case 'PATCH':
            await collection.updateOne(
                {_id: ObjectId(id)},
                {$set: {classes, updateAt: new Date()}}
            )
            return response
                .status(204)
                .json({message: 'A associação foi realizada com sucesso'})
        default:
            response.setHeader('Allow', ['PATCH'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
