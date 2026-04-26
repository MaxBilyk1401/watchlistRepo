import { randomUUID } from 'node:crypto';
import type { CreateWatchlistDto, WatchlistItem } from './watchlist.types';

export class WatchlistService {
    private items: WatchlistItem[] = []

    create(dto: CreateWatchlistDto): WatchlistItem {
        const item: WatchlistItem = { 
            id: randomUUID(),
            ...dto,
            createdAt: new Date(),
        }
        this.items.push(item)
        return item
    }

    findAll(): WatchlistItem[] {
        return this.items
    }
}