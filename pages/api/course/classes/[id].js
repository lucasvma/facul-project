import {connectToDatabase} from "../../db/mongodb";
import {ObjectId} from "mongodb";

export default async (request, response) => {
    const {
        method,
        query: {id}
    } = request

    const {db} = await connectToDatabase();

    const courseCollection = await db.collection('courses')
    const collectionClasses = await db.collection('classes')

    switch (method) {
        case 'GET':
            const classesCourse = await courseCollection.findOne({_id: ObjectId(id)})
            const classes = await collectionClasses.find().toArray()

            const filteredClasses = await classes.filter((grade) => classesCourse?.classes?.includes(grade._id.toString())) || null

            return response
                .status(200)
                .json({filteredClasses})
        default:
            response.setHeader('Allow', ['GET'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
