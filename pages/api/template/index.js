import {connectToDatabase} from "../db/mongodb";
import {ObjectId} from "mongodb";

export default async (req, res) => {
    const { method } = req

    const {db} = await connectToDatabase();

    const collection = db.collection('exams')

    switch (method) {
        case 'GET':
            const returnedExam = await collection.findOne({ _id: ObjectId('6243a1bf8173c9451e7bccc7') })

            res.setHeader('Content-Type', 'text/plain');
            res.setHeader('Content-Disposition', 'attachment; filename=template.txt');

            return res
                .status(200)
                .send(returnedExam.exam)
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
