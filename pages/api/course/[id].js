import {connectToDatabase} from "../db/mongodb";
import {ObjectId} from "mongodb";

export default async (request, response) => {
    const {
        method,
        query: {id},
        body: {title, initialDate, finalDate, workLoad, hasWorkLoad, hasPresence, hasEvaluation, hasExercises, hasEndButton,
            description, isPaid, value}
    } = request

    const {db} = await connectToDatabase();

    const collection = db.collection('courses');

    switch (method) {
        case 'GET':
            const course = await collection.findOne({ _id: ObjectId(id) })

            return response
                .status(200)
                .json({course})
        case 'PUT':
            await collection.updateOne(
                {_id: ObjectId(id)},
                {
                    $set: {title, initialDate, finalDate, workLoad, hasWorkLoad, hasPresence, hasEvaluation, hasExercises,
                        hasEndButton, description, isPaid, value, updateAt: new Date()}
                })
            return response
                .status(204)
        case 'DELETE':
            await collection.deleteOne({_id: ObjectId(id)})
            console.log(`deleted: ${id}`)
            return response
                .status(200)
                .json({message: 'O Curso foi removido com sucesso'})
        default:
            response.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
