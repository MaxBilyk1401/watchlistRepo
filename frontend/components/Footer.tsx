export function Footer() {
    return (
        <footer className="border-t bg-white mt-auto">
            <div className="max-w-3xl mx-auto px-4 py-6 text-sm text-gray-500 text-center">
                © {new Date().getFullYear()} Watchlist · learning project
            </div>
        </footer>
    )
}