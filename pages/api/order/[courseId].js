import {connectToDatabase} from "../db/mongodb";
import {ObjectId} from "mongodb";
import {getSession} from "next-auth/client";

export default async (request, response) => {
    const {
        method,
        body: { paymentStatus }
    } = request

    const session = await getSession({ req: request })
    const email = session?.user?.email
    const courseId = request.query.courseId;
    const {db} = await connectToDatabase();

    const collection = db.collection('order')

    switch (method) {
        case 'GET':
            const order = await collection.findOne({ email, courseId })

            return response
                .status(200)
                .json({ order })
        case 'PUT':
            await collection.updateOne(
                {_id: ObjectId(courseId)},
                {
                    $set: {
                        paymentStatus,
                        updateAt: new Date()
                    }
                })

            return response
                .status(204)
                .json({message: `Alterado o status do pedido para ${paymentStatus}`})
        default:
            response.setHeader('Allow', ['GET','PUT'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
