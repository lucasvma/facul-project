import {dbHandler as db} from "./db/db";
import { useSession } from 'next-auth/client'

export default async (request, response) => {
    const [ session ] = useSession()
    const {
        method,
        body: { courseId, classId }
    } = request

    const db = await db()

    const collection = db.collection('courseProgress')

    switch (method) {
        case 'GET':
            const courseProgress = await collection.find({
                courseId,
                user: session.user.email
            }, { classId: 1, _id: 0 }).toArray()

            console.log('courseProgress', courseProgress)

            return response
                .status(200)
                .json({ 'O progresso desse curso é a aula de X: ': courseProgress })
        case 'POST':
            await collection.insertOne({
                courseId,
                classId,
                user: session.user.email,
                createdAt: new Date()
            })

            return response
                .status(201)
                .json({ message: 'Progresso realizado com sucesso' })
        case 'PUT':
            await collection.findOneAndUpdate({
                courseId,
                user: session.user.email }, {
                    classId,
                    updateAt: session.user.email,
                    updateBy: new Date()
            })

            return response
                .status(200)
                .json({ message: 'Progresso atualizado com sucesso' })
        default:
            response.setHeader('Allow', ['GET', 'POS', 'PUT'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
