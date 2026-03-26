import Result from '../models/Result.js'

// POST /api/results  — save a test result
export const saveResult = async (req, res) => {
    try {
        const { wpm, rawWpm, accuracy, errors, duration, mode, passageId, charCount } = req.body

        const result = await Result.create({
            user: req.user._id,
            wpm,
            rawWpm,
            accuracy,
            errors,
            duration,
            mode: mode || 'quotes',
            passage: passageId,
            charCount: charCount || 0,
        })

        res.status(201).json(result)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// GET /api/results/me  — get current user's results
export const getMyResults = async (req, res) => {
    try {
        const results = await Result.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .limit(50)

        res.json(results)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// GET /api/results/stats  — aggregated stats for current user
export const getMyStats = async (req, res) => {
    try {
        const results = await Result.find({ user: req.user._id })

        if (results.length === 0) {
            return res.json({
                totalTests: 0,
                bestWpm: 0,
                avgWpm: 0,
                avgAccuracy: 0,
                totalTime: 0,
            })
        }

        const totalTests = results.length
        const bestWpm = Math.max(...results.map(r => r.wpm))
        const avgWpm = Math.round(results.reduce((s, r) => s + r.wpm, 0) / totalTests)
        const avgAccuracy = Math.round(results.reduce((s, r) => s + r.accuracy, 0) / totalTests)
        const totalTime = results.reduce((s, r) => s + r.duration, 0)

        res.json({ totalTests, bestWpm, avgWpm, avgAccuracy, totalTime })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}