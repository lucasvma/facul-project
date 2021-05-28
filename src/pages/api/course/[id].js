export default function courseHandler(req, res) {
    const {
        query: { id, name, publicCourse, classes },
        method,
    } = req

    switch (method) {
        case 'GET':
            // Get data from your db
            res.status(200).json({ id, name: `User ${id}` })
            break
        case 'PUT':
            // Update or create data in your db
            res.status(200).json({ id, name: name || `User ${id}` })
            break
        default:
            res.setHeader('Allow', ['GET', 'POS', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
