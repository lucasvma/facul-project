import {connectToDatabase} from "../db/mongodb";
import {getSession} from "next-auth/client";

export default async (request, response) => {
    const {
        method,
        body: { paypalOrderId, paymentStatus, oldPaypalOrderId }
    } = request

    const session = await getSession({ req: request })
    const email = session?.user?.email
    const courseId = request.query.courseId;
    const {db} = await connectToDatabase();

    const collection = db.collection('order')

    switch (method) {
        case 'GET':
            const order = await collection.find({ email, courseId }).sort({ createdAt: 1 }).limit(1).toArray();

            return response
                .status(200)
                .json({ order: order[0] })
        case 'PUT':
            await collection.updateOne(
                { paypalOrderId },
                {
                    $set: {
                        paymentStatus,
                        updateAt: new Date()
                    }
                })

            const updatedOrder = await collection.findOne({ paypalOrderId });

            return response
                .status(200)
                .json({ order: updatedOrder })
        case 'PATCH':
            await collection.updateOne(
                { paypalOrderId: oldPaypalOrderId },
                {
                    $set: {
                        paypalOrderId,
                        updateAt: new Date()
                    }
                })

            const updatedIdOrder = await collection.findOne({ paypalOrderId });

            return response
                .status(200)
                .json({ order: updatedIdOrder })
        default:
            response.setHeader('Allow', ['GET','PUT','PATCH'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
