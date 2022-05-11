import {connectToDatabase} from "../../db/mongodb";
import {ObjectId} from "mongodb";
import {getSession} from "next-auth/client";

export default async (req, res) => {
    const {
        method,
        query: {id},
    } = req

    const session = await getSession({ req })
    const name = session?.user?.name

    const {db} = await connectToDatabase();

    const collection = db.collection('courses')

    switch (method) {
        case 'GET':
            const returnedCourse = await collection.findOne({ _id: ObjectId(id) })
            // const response = await axios.get(`http://localhost:3001/generate-certificate?studentName=${name}&courseName=${returnedCourse.title}`);
            // console.log('pdf', response.data);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');

            return res
                .status(200)
                .send({url: `http://localhost:3001/generate-certificate?studentName=${name}&courseName=${returnedCourse.title}`})
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
