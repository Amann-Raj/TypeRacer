const Input = ({
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    error,
    ...props
}) => {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label className="text-text-secondary text-xs font-mono uppercase tracking-widest">
                    {label}
                </label>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`
          w-full bg-bg-secondary border rounded-lg px-4 py-3
          text-text-primary font-mono text-sm
          placeholder-text-secondary/50
          outline-none transition-all duration-150
          focus:border-accent-primary/60
          ${error
                        ? 'border-accent-error/60'
                        : 'border-text-muted/30 hover:border-text-secondary/40'}
        `}
                {...props}
            />
            {error && (
                <span className="text-accent-error text-xs font-mono">{error}</span>
            )}
        </div>
    )
}

export default Input