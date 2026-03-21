import { useEffect, useRef } from 'react'
import TypingChar from './TypingChar'
import TypingStats from './TypingStats'

const TypingArea = ({
    passage,
    wpm,
    rawWpm,
    accuracy,
    timeLeft,
    errors,
    inputRef,
    typed,
    handleInput,
    getCharState,
    isFinished,
    isRunning,
}) => {
    const containerRef = useRef(null)

    // keep focus on hidden input when clicking the passage area
    const handleContainerClick = () => {
        inputRef.current?.focus()
    }

    // split passage into characters
    const chars = passage.split('')

    return (
        <div className="w-full max-w-3xl mx-auto">
            <TypingStats
                wpm={wpm}
                accuracy={accuracy}
                timeLeft={timeLeft}
                errors={errors}
            />

            {/* passage display */}
            <div
                ref={containerRef}
                onClick={handleContainerClick}
                className="
          relative bg-bg-secondary rounded-xl p-8 cursor-text
          border border-text-muted/30
          hover:border-text-secondary/30 transition-colors duration-200
        "
            >
                {/* hidden input that captures keystrokes */}
                <input
                    ref={inputRef}
                    value={typed}
                    onChange={handleInput}
                    disabled={isFinished}
                    className="
            absolute opacity-0 top-0 left-0 w-full h-full
            cursor-text z-10 caret-transparent
          "
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                />

                {/* character display */}
                <p className="
          text-xl leading-relaxed tracking-wide font-mono
          select-none break-all
        ">
                    {chars.map((char, index) => (
                        <TypingChar
                            key={index}
                            char={char}
                            state={getCharState(index)}
                        />
                    ))}
                </p>

                {/* start prompt */}
                {!isRunning && !isFinished && typed.length === 0 && (
                    <p className="
            absolute bottom-3 right-4 text-text-secondary text-xs
            tracking-widest uppercase pointer-events-none
          ">
                        start typing...
                    </p>
                )}
            </div>
        </div>
    )
}

export default TypingArea