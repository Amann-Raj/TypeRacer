import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import passageRoutes from './routes/passageRoutes.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config()

const app = express()

connectDB()

app.use(cors())
app.use(express.json())
app.use('/api/passages', passageRoutes)
app.use('/api/auth', authRoutes)

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})