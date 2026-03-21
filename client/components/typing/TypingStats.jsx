const StatBox = ({ label, value }) => (
    <div className="flex flex-col items-center gap-1">
        <span className="text-accent-primary text-2xl font-bold font-mono">
            {value}
        </span>
        <span className="text-text-secondary text-xs uppercase tracking-widest">
            {label}
        </span>
    </div>
)

const TypingStats = ({ wpm, accuracy, timeLeft, errors }) => {
    return (
        <div className="flex items-center justify-center gap-12 mb-8">
            <StatBox label="wpm" value={wpm} />
            <StatBox label="accuracy" value={`${accuracy}%`} />
            <StatBox label="time" value={timeLeft} />
            <StatBox label="errors" value={errors} />
        </div>
    )
}

export default TypingStats