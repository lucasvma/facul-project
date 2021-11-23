import {connectToDatabase} from '../../db/mongodb'
import {ObjectId} from "mongodb";

export default async (request, response) => {
    const {
        method,
        query: { id },
        body: { currentProgress }
    } = request

    const courseId = id
    const clientId = 1

    const { db } = await connectToDatabase();

    const courseProgressCollection = db.collection('courseProgress')

    switch (method) {
        case 'GET':
            const classCourseProgress = await courseProgressCollection.find({
                courseId,
                clientId
            }, { currentProgress: 1, _id: 0 }).limit(1).toArray()

            return response
                .status(200)
                .json({ classCourseProgress })
        case 'POST':
            await courseProgressCollection.insertOne({
                courseId,
                clientId,
                currentProgress: 0,
                watchedClasses: [],
                createdAt: new Date()
            })

            return response
                .status(201)
                .json({ message: 'Progresso realizado com sucesso' })
        case 'PUT':
            await courseProgressCollection.updateOne(
                { courseId: id },
                { $set: { currentProgress, updateAt: new Date() }})
            console.log(`progress was updated to: ${currentProgress}`)
            return response
                .status(200)
                .json({ message: 'Progresso atualizado com sucesso' })
        default:
            response.setHeader('Allow', ['GET', 'POST', 'PUT'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
