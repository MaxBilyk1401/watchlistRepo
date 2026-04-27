import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Welcome 👋</h1>
      <p className="text-gray-700">
        This is a tiny app where I keep a list of movies and series.
      </p>
      <Link
        href="/watchlist"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700
  transition-colors"
      >
        Open my list →
      </Link>
    </div>
  )
}