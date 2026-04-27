'use client'

import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'

type Status = 'planned' | 'watching' | 'done'

type WatchlistItem = {
    _id: string
    title: string
    status: Status
    rating?: number
    note?: string
    createdAt: string
}

const API_URL = 'http://localhost:4200'

const statusLabels: Record<Status, string> = {
    planned: 'Planned',
    watching: 'Watching',
    done: 'Done',
}

const statusColors: Record<Status, string> = {
    planned: 'bg-gray-100 text-gray-700',
    watching: 'bg-blue-100 text-blue-700',
    done: 'bg-green-100 text-green-700',
}

export default function WatchlistPage() {
    const [items, setItems] = useState<WatchlistItem[]>([])
    const [title, setTitle] = useState('')
    const [status, setStatus] = useState<Status>('planned')
    const [rating, setRating] = useState('')
    const [error, setError] = useState<string | null>(null)

    async function loadItems() {
        const res = await fetch(`${API_URL}/api/watchlist`)
        const data: WatchlistItem[] = await res.json()
        setItems(data)
    }

    useEffect(() => {
        loadItems()
    }, [])

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setError(null)

        const res = await fetch(`${API_URL}/api/watchlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer test',
            },
            body: JSON.stringify({
                title,
                status,
                ...(rating ? { rating: Number(rating) } : {}),
            }),
        })

        if (!res.ok) {
            const data = await res.json().catch(() => ({}))
            setError(data.message ?? 'Failed to create item')
            return
        }

        setTitle('')
        setStatus('planned')
        setRating('')
        await loadItems()
    }

    async function handleDelete(id: string) {
        await fetch(`${API_URL}/api/watchlist/${id}`, {
            method: 'DELETE',
            headers: { Authorization: 'Bearer test' },
        })
        await loadItems()
    }

    return (
        <div className="space-y-8">
            <section>
                <h1 className="text-3xl font-bold mb-2">My watchlist</h1>
                <p className="text-gray-600">
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                </p>
            </section>

            <section className="bg-white rounded-lg border p-6">
                <h2 className="text-lg font-semibold mb-4">Add new</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title (e.g. Inception)"
                        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        minLength={3}
                    />

                    <div className="flex gap-3">
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as Status)}
                            className="border rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2
  focus:ring-blue-500"
                        >
                            <option value="planned">Planned</option>
                            <option value="watching">Watching</option>
                            <option value="done">Done</option>
                        </select>

                        <input
                            type="number"
                            min={0}
                            max={10}
                            step={0.1}
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            placeholder="Rating (0–10)"
                            className="border rounded px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {error && (
                        <p className="text-red-600 text-sm">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                        Add
                    </button>
                </form>
            </section>

            <section className="space-y-3">
                {items.length === 0 ? (
                    <p className="text-gray-500 italic">
                        Nothing here yet. Add your first movie above.
                    </p>
                ) : (
                    items.map((item) => (
                        <article
                            key={item._id}
                            className="bg-white rounded-lg border p-4 flex items-start justify-between gap-4"
                        >
                            <div>
                                <h3 className="font-semibold">{item.title}</h3>
                                <div className="flex items-center gap-2 mt-1 text-sm">
                                    <span
                                        className={`inline-block px-2 py-0.5 rounded ${statusColors[item.status]}`}
                                    >
                                        {statusLabels[item.status]}
                                    </span>
                                    {item.rating !== undefined && (
                                        <span className="text-gray-600">★ {item.rating}</span>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(item._id)}
                                className="text-red-600 text-sm hover:underline"
                            >
                                Delete
                            </button>
                        </article>
                    ))
                )}
            </section>
        </div>
    )
}