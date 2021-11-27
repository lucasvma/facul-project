import {connectToDatabase} from "../db/mongodb";
import {ObjectId} from "mongodb";

export default async (request, response) => {
    const {
        method,
        body: { status }
    } = request
    const requestId = request.query.id
    const {db} = await connectToDatabase();

    const collection = db.collection('requests')

    switch (method) {
        case 'PUT':
            await collection.updateOne(
                {_id: ObjectId(requestId)},
                {
                    $set: {
                        status,
                        updateAt: new Date()
                    }
                })

            return response
                .status(204)
                .json({message: 'A requisição foi aprovada/reprovada'})
        default:
            response.setHeader('Allow', ['PUT'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
