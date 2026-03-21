import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

export const fetchRandomPassage = (mode = 'quotes', difficulty) => {
    const params = { mode }
    if (difficulty) params.difficulty = difficulty
    return api.get('/passages/random', { params })
}

export default api