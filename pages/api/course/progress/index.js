import {connectToDatabase} from "../../db/mongodb";
import {getSession} from "next-auth/client";

export default async (request, response) => {
    const {
        method,
    } = request
    const session = await getSession({ req: request })
    const email = session?.user?.email

    const { db } = await connectToDatabase();
    const courseCollection = await db.collection('courses')
    const courseProgressCollection = await db.collection('courseProgress')

    switch (method) {
        case 'GET':
            const courseIds = await courseCollection.find({ createdBy: email }).toArray()
            const courseProgress = await courseProgressCollection.find({ courseId: { $in: courseIds } }).toArray()

            return response
                .status(200)
                .json({ courseProgress })
        default:
            response.setHeader('Allow', ['GET'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
