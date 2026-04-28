'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const API_URL = 'http://localhost:4200'

type TrendingMovie = {
    tmdbId: number
    title: string
    overview: string
    posterPath: string | null
    voteAverage: number
    rank: number
}

type TrendingSnapshot = {
    _id: string
    date: string
    movies: TrendingMovie[]
    fetchedAt: string
}

export default function TrendingPage() {
    const [snapshot, setSnapshot] = useState<TrendingSnapshot | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch(`${API_URL}/api/trending/today`)
                if (res.status === 404) {
                    setSnapshot(null)
                    return
                }
                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                const data: TrendingSnapshot = await res.json()
                setSnapshot(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load')
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    if (loading) return <p className="text-gray-500">Loading top 20...</p>
    if (error) return <p className="text-red-600">Error: {error}</p>
    if (!snapshot) return <p className="text-gray-500 italic">No data for today yet.</p>

    return (
        <div className="space-y-6">
            <section>
                <h1 className="text-3xl font-bold mb-1">Trending today</h1>
                <Link href="/trending/history" className="text-sm text-blue-600 hover:underline">View history</Link>
            </section>

            <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {snapshot.movies.map((movie) => (
                    <li key={movie.tmdbId} className="bg-white rounded-lg border overflow-hidden">
                        {movie.posterPath ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w342${movie.posterPath}`}
                                alt={movie.title}
                                className="w-full aspect-[2/3] object-cover"
                            />
                        ) : (
                            <div className="w-full aspect-[2/3] bg-gray-200 flex items-center justify-center text-gray-500
  text-sm">
                                No image
                            </div>
                        )}
                        <div className="p-3">
                            <div className="flex items-baseline justify-between gap-2">
                                <span className="text-xs text-gray-500">#{movie.rank}</span>
                                <span className="text-xs text-gray-600">★ {movie.voteAverage.toFixed(1)}</span>
                            </div>
                            <h3 className="font-semibold text-sm mt-1 line-clamp-2">{movie.title}</h3>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}