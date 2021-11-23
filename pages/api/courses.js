import {connectToDatabase} from "./db/mongodb";

export default async (request, response) => {
    const {
        method,
        body: {title, description, classes}
    } = request

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
