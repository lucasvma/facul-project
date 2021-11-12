import {connectToDatabase} from "../db/mongodb";
import {ObjectId} from "mongodb";

export default async (request, response) => {
    const {
        method,
        query: { id },
    } = request

    const { db } = await connectToDatabase();

    const collection = db.collection('requests')

    switch (method) {
        case 'GET':
            const grade = await collection.find({ _id: id }).toArray()

            return response
                .status(200)
                .json({ grade })
        case 'POST':
            await collection.insertOne({
                clientId,
                status: 0,
                createdAt: new Date(),
                updateAt: new Date()
            })

            return response
                .status(201)
                .json({ message: 'A requisição foi efetuada com sucesso' })
        case 'PUT':
            await collection.updateOne(
                { _id: ObjectId(id) },
                { $set: {
                    status,
                    updateAt: new Date()
                }
            })

            return response
                .status(204)
                .json({ message: 'A requisição foi aprovada/reprovada' })
        case 'DELETE':
            await collection.deleteOne({ _id: ObjectId(id) })

            return response
                .status(200)
                .json({ message: 'A requisição foi cancelada com sucesso' })
        default:
            response.setHeader('Allow', ['GET','POST','PUT','DELETE'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
