'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const API_URL = 'http://localhost:4200'

type HistoryEntry = {
    _id: string
    date: string
    fetchedAt: string
}

function formatDate(iso: string): string {
    return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

export default function TrendingHistoryPage() {
    const [entries, setEntries] = useState<HistoryEntry[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch(`${API_URL}/api/trending/history`)
                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                const data: HistoryEntry[] = await res.json()
                setEntries(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load')
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    if (loading) return <p className="text-gray-500">Loading history...</p>
    if (error) return <p className="text-red-600">Error: {error}</p>

    return (
        <div className="space-y-6">
            <section>
                <h1 className="text-3xl font-bold mb-1">Trending history</h1>
                <p className="text-gray-600 text-sm">
                    {entries.length} {entries.length === 1 ? 'snapshot' : 'snapshots'} stored
                </p>
            </section>

            {entries.length === 0 ? (
                <p className="text-gray-500 italic">No snapshots yet.</p>
            ) : (
                <ul className="space-y-2">
                    {entries.map((entry) => (
                        <li key={entry._id}>
                            <Link
                                href={`/trending/${entry.date}`}
                                className="block bg-white rounded-lg border p-4 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold">{formatDate(entry.date)}</span>
                                    <span className="text-xs text-gray-500">
                                        fetched at {new Date(entry.fetchedAt).toLocaleTimeString()}
                                    </span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}