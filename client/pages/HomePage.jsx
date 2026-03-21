import { useState, useEffect, useCallback } from 'react'
import TypingArea from '../components/typing/TypingArea'
import ResultPage from './ResultPage'
import Loader from '../components/ui/Loader'
import Button from '../components/ui/Button'
import useTypingEngine from '../hooks/useTypingEngine'
import { fetchRandomPassage } from '../services/api'

const MODES = ['quotes', 'words', 'code']
const DURATIONS = [15, 30, 60, 120]

const HomePage = () => {
    const [passage, setPassage] = useState(null)
    const [loading, setLoading] = useState(true)
    const [mode, setMode] = useState('quotes')
    const [duration, setDuration] = useState(60)

    const {
        typed, timeLeft, isRunning, isFinished,
        wpm, rawWpm, accuracy, errors,
        inputRef, handleInput, reset, getCharState,
    } = useTypingEngine(passage?.text || '', duration)

    // fetch a new passage from the API
    const loadPassage = useCallback(async () => {
        setLoading(true)
        try {
            const res = await fetchRandomPassage(mode)
            setPassage(res.data)
        } catch (err) {
            console.error('Failed to fetch passage', err)
        } finally {
            setLoading(false)
        }
    }, [mode])

    // load on mount and when mode changes
    useEffect(() => {
        loadPassage()
    }, [loadPassage])

    // tab key = restart
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Tab') {
                e.preventDefault()
                handleRestart()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [passage])

    const handleRestart = () => {
        reset()
    }

    const handleNewPassage = () => {
        reset()
        loadPassage()
    }

    const handleModeChange = (newMode) => {
        setMode(newMode)
        reset()
    }

    const handleDurationChange = (newDuration) => {
        setDuration(newDuration)
        reset()
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader text="loading passage..." />
            </div>
        )
    }

    if (isFinished) {
        return (
            <ResultPage
                wpm={wpm}
                rawWpm={rawWpm}
                accuracy={accuracy}
                errors={errors}
                timeLeft={timeLeft}
                duration={duration}
                onRestart={handleRestart}
                onNewPassage={handleNewPassage}
            />
        )
    }

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">

            {/* mode selector */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
                {MODES.map(m => (
                    <button
                        key={m}
                        onClick={() => handleModeChange(m)}
                        className={`
              px-4 py-1.5 rounded-lg text-sm font-mono transition-all duration-150
              ${mode === m
                                ? 'text-accent-primary border border-accent-primary/50 bg-accent-primary/10'
                                : 'text-text-secondary hover:text-text-primary border border-transparent'}
            `}
                    >
                        {m}
                    </button>
                ))}

                <span className="text-text-muted mx-2">|</span>

                {DURATIONS.map(d => (
                    <button
                        key={d}
                        onClick={() => handleDurationChange(d)}
                        className={`
              px-4 py-1.5 rounded-lg text-sm font-mono transition-all duration-150
              ${duration === d
                                ? 'text-accent-primary border border-accent-primary/50 bg-accent-primary/10'
                                : 'text-text-secondary hover:text-text-primary border border-transparent'}
            `}
                    >
                        {d}s
                    </button>
                ))}
            </div>

            {/* typing area */}
            {passage && (
                <TypingArea
                    passage={passage.text}
                    typed={typed}
                    wpm={wpm}
                    rawWpm={rawWpm}
                    accuracy={accuracy}
                    timeLeft={timeLeft}
                    errors={errors}
                    inputRef={inputRef}
                    handleInput={handleInput}
                    getCharState={getCharState}
                    isFinished={isFinished}
                    isRunning={isRunning}
                />
            )}

            {/* bottom controls */}
            <div className="flex items-center justify-center gap-4">
                <Button onClick={handleRestart} variant="ghost">
                    ↺ restart
                </Button>
                <Button onClick={handleNewPassage} variant="ghost">
                    new passage
                </Button>
            </div>

            <p className="text-center text-text-secondary text-xs font-mono">
                press <kbd className="bg-bg-tertiary px-2 py-0.5 rounded text-text-primary">tab</kbd> to restart
            </p>

        </div>
    )
}

export default HomePage