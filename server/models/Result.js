import mongoose from 'mongoose'

const resultSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        wpm: {
            type: Number,
            required: true,
        },
        rawWpm: {
            type: Number,
            required: true,
        },
        accuracy: {
            type: Number,
            required: true,
        },
        errors: {
            type: Number,
            default: 0,
        },
        duration: {
            type: Number,
            required: true,
        },
        mode: {
            type: String,
            enum: ['words', 'quotes', 'code'],
            default: 'quotes',
        },
        passage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Passage',
        },
        charCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
)

const Result = mongoose.model('Result', resultSchema)

export default Result