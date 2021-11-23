import {connectToDatabase} from "../db/mongodb";
import {ObjectId} from "mongodb";

export default async (request, response) => {
    const {
        method,
        query: {id},
        body: {status, email}
    } = request

    const {db} = await connectToDatabase();

    const collection = db.collection('requests')

    switch (method) {
        case 'GET':
            const requests = await collection.find({email}).toArray()

            return response
                .status(200)
                .json({requests})
        case 'POST':
            await collection.insertOne({
                email,
                status: 0,
                createdAt: new Date(),
                updateAt: new Date()
            })

            return response
                .status(201)
                .json({message: 'A requisição foi efetuada com sucesso'})
        case 'PUT':
            console.log('requisição sendo atuailizada')
            await collection.updateOne(
                {_id: ObjectId(id)},
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
            response.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
