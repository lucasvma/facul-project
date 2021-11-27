import {connectToDatabase} from "./db/mongodb";
import {getSession} from "next-auth/client";

export default async (request, response) => {
    const {
        method,
        body: {title, description, classes}
    } = request
    const session = await getSession({ req: request })
    const email = session?.user?.email

    const {db} = await connectToDatabase();

    const collection = db.collection('courses')

    switch (method) {
        case 'GET':
            const courses = await collection.find().toArray()

            return response.status(200).json({courses})
        case 'POST':
            await collection.insertOne({
                title,
                description,
                visibility: 1,
                classes,
                createBy: email,
                createdAt: new Date()
            })

            return response
                .status(201)
                .json({message: 'O Curso foi cadastrado com sucesso'})
        default:
            response.setHeader('Allow', ['GET', 'POST'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }

}
