import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Passage from './models/Passage.js'

dotenv.config({ path: './.env' })

const passages = [
    // quotes
    {
        text: "The quick brown fox jumps over the lazy dog near the riverbank where children play every summer afternoon without fail.",
        mode: 'quotes', difficulty: 'easy'
    },
    {
        text: "All we have to decide is what to do with the time that is given us. The world is not in your books and maps, it is out there.",
        mode: 'quotes', difficulty: 'easy'
    },
    {
        text: "It is not the mountain we conquer but ourselves. Every summit offers a view of more mountains to climb and more challenges to face.",
        mode: 'quotes', difficulty: 'easy'
    },
    {
        text: "The only way to do great work is to love what you do. If you have not found it yet, keep looking. Do not settle for anything less.",
        mode: 'quotes', difficulty: 'medium'
    },
    {
        text: "In the middle of every difficulty lies opportunity. Success is not final, failure is not fatal, it is the courage to continue that counts.",
        mode: 'quotes', difficulty: 'medium'
    },
    {
        text: "Two things are infinite: the universe and human stupidity; and I am not sure about the universe. Imagination is more important than knowledge.",
        mode: 'quotes', difficulty: 'medium'
    },
    {
        text: "The greatest glory in living lies not in never falling, but in rising every time we fall. Life is what happens when you are busy making other plans.",
        mode: 'quotes', difficulty: 'medium'
    },
    {
        text: "Programming is not about typing, it is about thinking. The best programmers are not the ones who type fastest but those who think most clearly.",
        mode: 'quotes', difficulty: 'hard'
    },
    {
        text: "Simplicity is the soul of efficiency. The art of programming is the art of organizing complexity, of mastering multitude and avoiding its bastard chaos.",
        mode: 'quotes', difficulty: 'hard'
    },
    // words mode
    {
        text: "forest river mountain ocean breeze storm thunder lightning cloud sunrise sunset valley desert jungle canyon glacier volcano island peninsula cliff shore harbor reef coral bay cove inlet",
        mode: 'words', difficulty: 'easy'
    },
    {
        text: "function variable constant boolean string integer array object return export import async await promise resolve reject callback event listener handler module class method property",
        mode: 'words', difficulty: 'medium'
    },
    {
        text: "abstraction encapsulation polymorphism inheritance recursion iteration algorithm complexity optimization refactoring debugging deployment architecture scalability performance reliability",
        mode: 'words', difficulty: 'hard'
    },
    // code mode
    {
        text: "const greet = (name) => { return `Hello, ${name}!`; }; console.log(greet('world'));",
        mode: 'code', difficulty: 'easy'
    },
    {
        text: "async function fetchData(url) { const response = await fetch(url); const data = await response.json(); return data; }",
        mode: 'code', difficulty: 'medium'
    },
    {
        text: "const debounce = (fn, delay) => { let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); }; };",
        mode: 'code', difficulty: 'hard'
    },
]

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB')

        await Passage.deleteMany({})
        console.log('Cleared existing passages')

        await Passage.insertMany(passages)
        console.log(`Seeded ${passages.length} passages`)

        process.exit(0)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

seed()