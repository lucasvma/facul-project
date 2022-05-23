import {connectToDatabase} from '../../db/mongodb'
import {getSession} from "next-auth/client";

export default async (request, response) => {
    const {
        method,
        body: { currentProgress, isComplete }
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
            }, { currentProgress: 1, _id: 0 })

            return response
                .status(200)
                .json({ classCourseProgress })
        case 'POST':
            const courseProgress = await courseProgressCollection.findOne({
                courseId,
                email
            }, { currentProgress: 1, _id: 0 })

            if (courseProgress?.courseProgress !== null) {
                return response
                    .status(200)
                    .json({message: 'Progresso já existe'})
            }

            await courseProgressCollection.insertOne({
                courseId,
                email,
                currentProgress: 0,
                watchedClasses: [0],
                createdAt: new Date()
            })

            return response
                .status(201)
                .json({message: 'Progresso realizado com sucesso'})
        case 'PUT':
            const watchedClasses = await courseProgressCollection.findOne({
                courseId,
                email
            }, { watchedClasses: 1, _id: 0 })

            if (!watchedClasses?.watchedClasses?.length) {
                watchedClasses.watchedClasses = [currentProgress]
            } else if (watchedClasses?.watchedClasses?.indexOf(currentProgress) === -1) {
                watchedClasses.watchedClasses.push(currentProgress)
            }

            await courseProgressCollection.updateOne(
                { courseId, email },
                { $set: { currentProgress, isComplete, watchedClasses: watchedClasses.watchedClasses, updateAt: new Date() } })

            return response
                .status(200)
                .json({ watchedClasses: watchedClasses.watchedClasses })
        default:
            response.setHeader('Allow', ['GET', 'POST', 'PUT'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
