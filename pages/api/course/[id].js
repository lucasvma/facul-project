export default async (request, response) => {
    const {
        method,
        query: { id },
        body: { title, description, publicClass }
    } = request

    const db = await db()

    const collection = db.collection('courses')

    switch (method) {
        case 'GET':
            const course = await collection.find({ _id: id }).toArray()

            return response
                .status(200)
                .json({ course })
        case 'PUT':
            // Update or create data in your db
            return response.status(200).json({ id, name: `User ${id}` })
        default:
            response.setHeader('Allow', ['GET', 'POS', 'PUT'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
