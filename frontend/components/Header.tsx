import Link from 'next/link'

export function Header() {
    return (
        <header className="border-b bg-white">
            <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="text-xl font-semibold">
                    Watchlist
                </Link>
                <nav className="flex gap-6 text-sm text-gray-700">
                    <Link href="/" className="hover:text-black">Home</Link>
                    <Link href="/watchlist" className="hover:text-black">My list</Link>
                </nav>
            </div>
        </header>
    )
}