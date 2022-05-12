import {connectToDatabase} from "./db/mongodb";
import {getSession} from "next-auth/client";

export default async (request, response) => {
    const {
        method,
        body: { courseId }
    } = request
    const session = await getSession({ req: request })
    const email = session?.user?.email

    const {db} = await connectToDatabase();
    const orderCollection = db.collection('order');
    const courseCollection = db.collection('course');

    switch (method) {
        case 'GET':
            const orders = await orderCollection.findOne({ email })

            return response
                .status(200)
                .json({ orders })
        case 'POST':
            const courseValue = await courseCollection.findOne({
                courseId,
            }, { value: 1, _id: 0 });

            await orderCollection.insertOne({
                email,
                courseId,
                total: courseValue,
                paymentStatus: PaymentStatusEnum.PENDING,
                createdAt: new Date(),
                updateAt: new Date()
            })

            return response
                .status(201)
                .json({message: 'O pedido do curso foi efetuado com sucesso'})
        default:
            response.setHeader('Allow', ['GET','POST'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
