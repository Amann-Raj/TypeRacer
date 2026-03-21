const Header = () => {
    return (
        <header className="w-full py-6 px-8 flex items-center justify-between max-w-5xl mx-auto">
            <div className="flex items-center gap-1">
                <span className="text-text-primary font-mono font-bold text-xl">typing</span>
                <span className="text-accent-primary font-mono font-bold text-xl">test</span>
            </div>
            <nav className="flex items-center gap-6">
                <a href="/" className="text-text-secondary hover:text-text-primary text-sm font-mono transition-colors">
                    home
                </a>
                <a href="/leaderboard" className="text-text-secondary hover:text-text-primary text-sm font-mono transition-colors">
                    leaderboard
                </a>
            </nav>
        </header>
    )
}

export default Header