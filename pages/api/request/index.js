import {connectToDatabase} from "../db/mongodb";
import {getSession} from "next-auth/client";

export default async (request, response) => {
    const {
        method,
        body: { status }
    } = request
    const session = await getSession({ req: request })
    const email = session?.user?.email

    const {db} = await connectToDatabase();
    const collection = await db.collection('requests')

    switch (method) {
        case 'GET':
            const request = await collection.findOne({ email })

            return response
                .status(200)
                .json({ request })
        case 'POST':
            await collection.insertOne({
                email,
                status,
                createdAt: new Date(),
                updateAt: new Date()
            })

            return response
                .status(201)
                .json({message: 'A requisição foi efetuada com sucesso'})
        default:
            response.setHeader('Allow', ['GET','POST'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
