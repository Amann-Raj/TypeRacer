import { useState, useEffect, useCallback, useRef } from 'react'

const useTypingEngine = (passage, duration = 60) => {
    const [typed, setTyped] = useState('')
    const [startTime, setStartTime] = useState(null)
    const [timeLeft, setTimeLeft] = useState(duration)
    const [isRunning, setIsRunning] = useState(false)
    const [isFinished, setIsFinished] = useState(false)
    const [wpm, setWpm] = useState(0)
    const [rawWpm, setRawWpm] = useState(0)
    const [accuracy, setAccuracy] = useState(100)
    const [errors, setErrors] = useState(0)
    const [errorMap, setErrorMap] = useState({})

    const timerRef = useRef(null)
    const inputRef = useRef(null)

    // ── focus the hidden input on mount ──────────────────────────
    useEffect(() => {
        if (inputRef.current) inputRef.current.focus()
    }, [passage])

    // ── timer logic ──────────────────────────────────────────────
    useEffect(() => {
        if (isRunning && !isFinished) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current)
                        setIsFinished(true)
                        setIsRunning(false)
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
        }
        return () => clearInterval(timerRef.current)
    }, [isRunning, isFinished])

    // ── calculate stats whenever typed changes ───────────────────
    useEffect(() => {
        if (!passage || !startTime) return

        const elapsedMinutes = (Date.now() - startTime) / 60000
        if (elapsedMinutes === 0) return

        const totalTyped = typed.length
        const correctChars = [...typed].filter((c, i) => c === passage[i]).length
        const errorCount = totalTyped - correctChars

        const calculatedRawWpm = Math.round((totalTyped / 5) / elapsedMinutes)
        const calculatedWpm = Math.round((correctChars / 5) / elapsedMinutes)
        const calculatedAcc = totalTyped === 0
            ? 100
            : Math.round((correctChars / totalTyped) * 100)

        setRawWpm(calculatedRawWpm)
        setWpm(calculatedWpm)
        setErrors(errorCount)
        setAccuracy(calculatedAcc)
    }, [typed, passage, startTime])

    // ── keystroke handler ────────────────────────────────────────
    const handleInput = useCallback((e) => {
        if (isFinished) return

        const value = e.target.value

        // start timer on first keystroke
        if (!isRunning && value.length === 1) {
            setIsRunning(true)
            setStartTime(Date.now())
        }

        // track which indices had errors
        const newErrorMap = { ...errorMap }
        const newIndex = value.length - 1
        if (newIndex >= 0 && value[newIndex] !== passage[newIndex]) {
            newErrorMap[newIndex] = true
        }

        setErrorMap(newErrorMap)
        setTyped(value)

        // finish when passage is fully typed
        if (value.length >= passage.length) {
            clearInterval(timerRef.current)
            setIsFinished(true)
            setIsRunning(false)
        }
    }, [isRunning, isFinished, passage, errorMap])

    // ── reset everything ─────────────────────────────────────────
    const reset = useCallback(() => {
        clearInterval(timerRef.current)
        setTyped('')
        setStartTime(null)
        setTimeLeft(duration)
        setIsRunning(false)
        setIsFinished(false)
        setWpm(0)
        setRawWpm(0)
        setAccuracy(100)
        setErrors(0)
        setErrorMap({})
        setTimeout(() => inputRef.current?.focus(), 50)
    }, [duration])

    // ── character state helper ───────────────────────────────────
    // returns 'correct' | 'incorrect' | 'current' | 'upcoming'
    const getCharState = useCallback((index) => {
        if (index < typed.length) {
            return typed[index] === passage[index] ? 'correct' : 'incorrect'
        }
        if (index === typed.length) return 'current'
        return 'upcoming'
    }, [typed, passage])

    return {
        typed,
        timeLeft,
        isRunning,
        isFinished,
        wpm,
        rawWpm,
        accuracy,
        errors,
        errorMap,
        inputRef,
        handleInput,
        reset,
        getCharState,
    }
}

export default useTypingEngine