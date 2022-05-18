import {connectToDatabase} from "./db/mongodb";
import {getSession} from "next-auth/client";
import {ObjectId} from "mongodb";

export default async (request, response) => {
    const {
        method,
        body: { courseId, paypalOrderId },
    } = request
    const session = await getSession({ req: request })
    const email = session?.user?.email

    const { db } = await connectToDatabase();
    const orderCollection = db.collection('order');
    const courseCollection = db.collection('courses');

    switch (method) {
        case 'GET':
            const orders = await orderCollection.find({ email }).toArray()

            return response
                .status(200)
                .json({ orders })
        case 'POST':
            const course = await courseCollection.findOne({
                _id: ObjectId(courseId),
            }, { value: 1, _id: 0 });

            const data = {
                email,
                courseId,
                paypalOrderId,
                total: course.value,
                paymentStatus: "PENDING",
                createdAt: new Date(),
                updateAt: new Date()
            }

            await orderCollection.insertOne(data)

            return response
                .status(201)
                .json({ order: data })
        default:
            response.setHeader('Allow', ['GET','POST'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
