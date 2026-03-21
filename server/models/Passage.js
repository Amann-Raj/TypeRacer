import mongoose from 'mongoose'

const passageSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true,
        },
        mode: {
            type: String,
            enum: ['words', 'quotes', 'code'],
            default: 'words',
        },
        difficulty: {
            type: String,
            enum: ['easy', 'medium', 'hard'],
            default: 'medium',
        },
        wordCount: {
            type: Number,
        },
    },
    { timestamps: true }
)

passageSchema.pre('save', function (next) {
    this.wordCount = this.text.trim().split(/\s+/).length
    next()
})

const Passage = mongoose.model('Passage', passageSchema)

export default Passage;