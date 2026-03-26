import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'

// POST /api/auth/register
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const userExists = await User.findOne({
            $or: [{ email }, { username }]
        })

        if (userExists) {
            const field = userExists.email === email ? 'Email' : 'Username'
            return res.status(400).json({ message: `${field} already in use` })
        }

        const user = await User.create({ username, email, password })
        const token = generateToken(user._id)

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token,
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// POST /api/auth/login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const user = await User.findOne({ email })

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        const token = generateToken(user._id)

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token,
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// GET /api/auth/me  (protected)
export const getMe = async (req, res) => {
    res.json(req.user)
}