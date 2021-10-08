import {connectToDatabase} from './db/mongodb'
import { useSession } from 'next-auth/client'

export default async (request, response) => {
    const [ session ] = useSession()
    const {
        method,
        body: { courseId, classId }
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

            const percentageProgress = (courseClasses.indexOf(classCourseProgress) * 100) / courseClasses.length

            console.log('classCourseProgress', classCourseProgress)
            console.log('courseClasses', courseClasses)
            console.log('percentageProgress', percentageProgress)
            console.log('indexOf', courseClasses.indexOf(classCourseProgress))
            console.log('ArrayLen', courseClasses.length)

            return response
                .status(200)
                .json({ 'O progresso desse curso é a aula de X: ': classCourseProgress })
        case 'POST':
            // verify step by button
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
            // await collection.findOneAndUpdate({
            //     courseId,
            //     user: session.user.email
            // }, {
            //     classId,
            //     updateAt: session.user.email,
            //     updateBy: new Date()
            // })
            //
            // return response
            //     .status(200)
            //     .json({ message: 'Progresso atualizado com sucesso' })
        default:
            response.setHeader('Allow', ['GET', 'POST'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
