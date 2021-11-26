import {connectToDatabase} from '../../db/mongodb'
import {getSession} from "next-auth/client";

export default async (request, response) => {
    const {
        method,
        body: { currentProgress }
    } = request
    const courseId = request.query.id
    const session = await getSession({ req: request })
    const email = session?.user?.email

    const { db } = await connectToDatabase();

    const courseProgressCollection = db.collection('courseProgress')

    switch (method) {
        case 'GET':
            const classCourseProgress = await courseProgressCollection.findOne({
                courseId,
                email
            }, {currentProgress: 1, _id: 0})

            return response
                .status(200)
                .json({classCourseProgress})
        case 'POST':
            await courseProgressCollection.insertOne({
                courseId,
                email,
                currentProgress: 0,
                watchedClasses: [],
                createdAt: new Date()
            })

            return response
                .status(201)
                .json({message: 'Progresso realizado com sucesso'})
        case 'PUT':
            await courseProgressCollection.updateOne(
                { courseId, email },
                {$set: {currentProgress, updateAt: new Date()}})
            console.log(`progress was updated to: ${currentProgress}`)
            return response
                .status(200)
                .json({message: 'Progresso atualizado com sucesso'})
        default:
            response.setHeader('Allow', ['GET', 'POST', 'PUT'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
