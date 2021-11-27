import {connectToDatabase} from "./db/mongodb";
import {useRouter} from 'next/router'
import {getSession} from "next-auth/client";

export default async (request, response) => {
    const {
        method,
        query: {order},
        body: {title, description, visibility}
    } = request
    const session = await getSession({ req: request })
    const email = session?.user?.email

    const {db} = await connectToDatabase();

    const collection = await db.collection('classes')

    switch (method) {
        case 'GET':
            const orderBy = order === 'desc' ? -1 : 1
            const classes = await collection.find().sort({ createdAt: orderBy }).toArray()

            return response
                .status(200)
                .json({classes})
        case 'POST':
            await collection.insertOne({
                title,
                description,
                visibility: true,
                createBy: email,
                createdAt: new Date()
            })

            return response
                .status(201)
                .json({message: 'A Aula foi cadastrada com sucesso'})

        default:
            response.setHeader('Allow', ['GET', 'POST', 'PUT'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
