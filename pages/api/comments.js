import {ObjectId} from "mongodb";
import {dbHandler as db} from "./db/db";
import { useSession } from 'next-auth/client'

export default async (request, response) => {
    const [ session ] = useSession()
    const {
        method,
        body: { comment, classId }
    } = request

    const db = await db()

    const collection = db.collection('classes')

    switch (method) {
        case 'GET':
            const comments = await collection.find(ObjectId(classId), { comments: 1, _id: 0 }).toArray()

            console.log('comments', comments)

            return response
                .status(200)
                .json({ "TEST": 123 })
        case 'PUT':
            await collection.findOneAndUpdate({
                _id: classId
            }, {
                $push: { comments: {
                        comment,
                        createBy: session.user.email,
                        createAt: new Date()
                    }
                }
            })

            return response
                .status(200)
                .json({ message: 'A aula foi comentada com sucesso' })
        default:
            response.setHeader('Allow', ['GET', 'POS', 'PUT'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
