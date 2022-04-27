import {connectToDatabase} from "./db/mongodb";
import {getSession} from "next-auth/client";

export default async (request, response) => {
    const {
        method,
        body: {exam, minimumGrade, maxTime, courseId}
    } = request
    const session = await getSession({ req: request })
    const email = session?.user?.email

    const { db } = await connectToDatabase();

    const collection = await db.collection('exams')

    switch (method) {
        case 'POST':
            const insertedId = await collection
                .insertOne({
                    exam,
                    minimumGrade,
                    maxTime,
                    courseId,
                    createBy: email,
                    createdAt: new Date()
                })
                .then(result => result.insertedId)

            return response
                .status(201)
                .json({ message: 'O Exame foi cadastrado com sucesso', insertedId })

        default:
            response.setHeader('Allow', ['POST'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
