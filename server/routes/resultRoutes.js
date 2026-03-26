import express from 'express'
import {
    saveResult,
    getMyResults,
    getMyStats,
} from '../controllers/resultController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, saveResult)
router.get('/me', protect, getMyResults)
router.get('/stats', protect, getMyStats)

export default router