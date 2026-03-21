import Passage from '../models/Passage.js'

export const getRandomPassage = async (req, res) => {
    try {
        const { mode = 'quotes', difficulty } = req.query

        const filter = { mode }
        if (difficulty) filter.difficulty = difficulty

        const count = await Passage.countDocuments(filter)

        if (count === 0) {
            return res.status(404).json({ message: 'No passages found' })
        }

        const random = Math.floor(Math.random() * count)
        const passage = await Passage.findOne(filter).skip(random)

        res.json(passage)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}