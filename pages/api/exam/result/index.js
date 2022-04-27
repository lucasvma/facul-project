import {getSession} from "next-auth/client";
import {connectToDatabase} from "../../db/mongodb";

export default async (request, response) => {
    const {
        method,
        body: {courseId, exam, gradeOnExam, passedOnExam}
    } = request

    const {db} = await connectToDatabase();

    const collection = db.collection('examsResult')
    const session = await getSession({ req: request })
    const email = session?.user?.email

    switch (method) {
        case 'GET':
            const returnedExamResult = await collection.findOne({ courseId, createBy: email })

            return response
                .status(200)
                .json({ returnedExamResult })
        case 'POST':
            const insertedId = await collection
                .insertOne({
                    courseId,
                    exam,
                    gradeOnExam,
                    passedOnExam,
                    createBy: email,
                    createdAt: new Date()
                })
                .then(result => result.insertedId)

            return response
                .status(201)
                .json({ message: 'A Aula foi cadastrada com sucesso', insertedId })
        default:
            response.setHeader('Allow', ['GET', 'POST'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
