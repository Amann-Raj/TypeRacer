const Loader = ({ text = 'loading...' }) => {
    return (
        <div className="flex flex-col items-center gap-3">
            <div className="
        w-6 h-6 border-2 border-text-muted border-t-accent-primary
        rounded-full animate-spin
      " />
            <p className="text-text-secondary text-sm font-mono">{text}</p>
        </div>
    )
}

export default Loaders