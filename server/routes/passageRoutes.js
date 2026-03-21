import express from 'express'
import { getRandomPassage } from '../controllers/passageController.js'

const router = express.Router()

router.get('/random', getRandomPassage)

export default router;