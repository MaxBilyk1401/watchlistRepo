export type WatchlistStatus = 'active' | 'inactive' | 'done'

export interface WatchlistItem {
    id: string
    title: string
    status: WatchlistStatus
    rating?: number
    note?: string
    createdAt: Date
}

export type CreateWatchlistDto = Omit<WatchlistItem, 'id' | 'createdAt'>