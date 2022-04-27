import {connectToDatabase} from "../db/mongodb";

export default async (request, response) => {
    const {
        method,
        query: {courseId},
        body: {exam, minimumGrade, maxTime}
    } = request

    const {db} = await connectToDatabase();

    const collection = db.collection('exams')

    switch (method) {
        case 'GET':
            const returnedExam = await collection.findOne({ courseId })

            return response
                .status(200)
                .json({returnedExam})
        case 'PUT':
            await collection.updateOne(
                { courseId },
                {
                    $set: {exam, minimumGrade, maxTime, updateAt: new Date()}
                })
            return response
                .status(204)
        case 'DELETE':
            await collection.deleteOne({ courseId })
            console.log(`deleted exam: ${courseId}`)
            return response
                .status(200)
                .json({message: 'O Exame foi removido com sucesso'})
        default:
            response.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
