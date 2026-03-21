const stateStyles = {
    correct: 'text-text-primary',
    incorrect: 'text-accent-error bg-accent-error/20 rounded-sm',
    current: 'text-text-primary border-b-2 border-accent-primary animate-pulse',
    upcoming: 'text-text-secondary',
}

const TypingChar = ({ char, state }) => {
    return (
        <span className={`${stateStyles[state]} transition-colors duration-75`}>
            {char === ' ' && state === 'incorrect' ? '·' : char}
        </span>
    )
}

export default TypingChar