export default async (request, response) => {
    const {
        method,
        query: { id },
        body: { title, description, publicClass }
    } = request

    console.log('there')

    const db = await db()

    const collection = db.collection('classes')

    switch (method) {
        case 'GET':
            const grade = await collection.find({ _id: id }).toArray()

            response
                .status(200)
                .json({ grade })
            break
        case 'PUT':
            // await collection.insertOne({
            //     title,
            //     description,
            //     createdAt: new Date()
            // })
            //
            // return response
            //     .status(201)
            //     .json({ message: 'A Aula foi cadastrada com sucesso' })
            // break
        default:
            response.setHeader('Allow', ['GET'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
