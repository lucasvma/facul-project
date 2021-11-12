import {connectToDatabase} from './db/mongodb'
import { useSession } from 'next-auth/client'
import {ObjectId} from "mongodb";

export default async (request, response) => {
    const [ session ] = useSession()
    const {
        method,
        body: { courseId, clientId, currentStep }
    } = request

    const { db } = await connectToDatabase();

    const courseProgressCollection = db.collection('courseProgress')
    const coursesCollection = db.collection('courses')

    switch (method) {
        case 'GET':
            const classCourseProgress = await courseProgressCollection.find({
                courseId,
                user: session.user.email
            }, { classId: 1, _id: 0 }).sort({ createAt:-1 }).limit(1).toArray()

            const courseClasses = await coursesCollection.find({
                courseId,
            }, { classes: 1 }).sort({ createAt:-1 }).limit(1).toArray()

            return response
                .status(200)
                .json({ 'O progresso desse curso é a aula de X: ': classCourseProgress })
        case 'POST':
            // verify currentStep by button
            await courseProgressCollection.insertOne({
                courseId,
                clientId,
                currentStep,
                watchedClasses,
                createdAt: new Date()
            })

            return response
                .status(201)
                .json({ message: 'Progresso realizado com sucesso' })
        case 'PUT':
            await courseProgressCollection.updateOne(
                { _id: ObjectId(id) },
                { $set: { title, description, updateAt: new Date() }
                })
            console.log(`class was updated: ${id}`)
            return response
                .status(200)
                .json({ message: 'Progresso atualizado com sucesso' })
        default:
            response.setHeader('Allow', ['GET', 'POST', 'PUT'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
