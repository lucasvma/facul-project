import {connectToDatabase} from "../../db/mongodb";

export default async (request, response) => {
    const {
        method,
        query: {courseId},
    } = request

    const {db} = await connectToDatabase();

    const collection = db.collection('examsResult')

    switch (method) {
        case 'GET':
            const returnedExam = await collection.findOne({ courseId }, { passedOnExam: 1, _id: 0 })

            return response
                .status(200)
                .json({"passedOnExam": returnedExam?.passedOnExam})
        default:
            response.setHeader('Allow', ['GET'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
