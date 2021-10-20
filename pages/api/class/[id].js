import {connectToDatabase} from "../db/mongodb";
import {ObjectId} from "mongodb";

export default async (request, response) => {
    const {
        method,
        query: { id },
        body: { title, description, visibility }
    } = request

    console.log('there')

    const { db } = await connectToDatabase();

    const collection = db.collection('classes')

    switch (method) {
        case 'GET':
            const grade = await collection.find({ _id: id }).toArray()

            return response
                .status(200)
                .json({ grade })
        case 'PUT':
            await collection.updateOne({ _id: ObjectId(id) }, {
                title,
                description,
                updateAt: new Date()
            })
            console.log(`updated: ${id}`)
            return response
                .status(204)
                .json({ message: 'A Aula foi cadastrada com sucesso' })
        case 'DELETE':
            await collection.deleteOne({ _id: ObjectId(id) })
            console.log(`deleted: ${id}`)
            return response
                .status(200)
                .json({ message: 'A Aula foi removida com sucesso' })
        default:
            response.setHeader('Allow', ['GET'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
