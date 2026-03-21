import Button from '../components/ui/Button'

const StatCard = ({ label, value, sub }) => (
    <div className="bg-bg-secondary rounded-xl p-6 flex flex-col items-center gap-1 border border-text-muted/20">
        <span className="text-accent-primary text-4xl font-bold font-mono">{value}</span>
        <span className="text-text-secondary text-xs uppercase tracking-widest">{label}</span>
        {sub && <span className="text-text-secondary text-xs mt-1">{sub}</span>}
    </div>
)

const ResultPage = ({ wpm, rawWpm, accuracy, errors, timeLeft, duration, onRestart, onNewPassage }) => {
    const timeTaken = duration - timeLeft

    return (
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-10 py-12">

            {/* title */}
            <div className="text-center">
                <h2 className="text-text-secondary text-sm font-mono uppercase tracking-widest mb-1">
                    test complete
                </h2>
                <h1 className="text-text-primary text-5xl font-bold font-mono">
                    {wpm} <span className="text-accent-primary text-2xl">wpm</span>
                </h1>
            </div>

            {/* stat grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                <StatCard label="accuracy" value={`${accuracy}%`} />
                <StatCard label="raw wpm" value={rawWpm} sub="unfiltered" />
                <StatCard label="errors" value={errors} />
                <StatCard label="time" value={`${timeTaken}s`} sub={`of ${duration}s`} />
            </div>

            {/* performance message */}
            <p className="text-text-secondary text-sm font-mono text-center">
                {wpm >= 80
                    ? 'exceptional speed. you are a typing wizard.'
                    : wpm >= 60
                        ? 'great job! above average speed.'
                        : wpm >= 40
                            ? 'solid result. keep practicing!'
                            : 'nice start. consistency beats speed.'}
            </p>

            {/* action buttons */}
            <div className="flex items-center gap-4">
                <Button onClick={onRestart} variant="primary">
                    ↺ restart same
                </Button>
                <Button onClick={onNewPassage} variant="ghost">
                    new passage
                </Button>
            </div>

            <p className="text-text-secondary text-xs font-mono">
                press <kbd className="bg-bg-tertiary px-2 py-0.5 rounded text-text-primary">tab</kbd> to restart
            </p>
        </div>
    )
}

export default ResultPage