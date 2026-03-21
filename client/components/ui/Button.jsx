const variants = {
    primary: 'bg-accent-primary text-bg-primary hover:bg-accent-primary/90',
    ghost: 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary border border-text-muted/30',
    danger: 'text-accent-error hover:bg-accent-error/10 border border-accent-error/30',
}

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
        px-5 py-2.5 rounded-lg text-sm font-mono font-medium
        transition-all duration-150 active:scale-95
        disabled:opacity-40 disabled:cursor-not-allowed
        ${variants[variant]} ${className}
      `}
        >
            {children}
        </button>
    )
}

export default Button