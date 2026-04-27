import { WatchlistModel } from './watchlist.model'
import type { CreateWatchlistDto, WatchlistItem } from './watchlist.types';

export class WatchlistService {
    create(dto: CreateWatchlistDto) {
        return WatchlistModel.create(dto)
    }

    findAll() {
        return WatchlistModel.find().sort({ createdAt: -1 })
    }

    findById(id: string) {
        return WatchlistModel.findById(id)
    }

    update(id: string, dto: Partial<CreateWatchlistDto>) {
        return WatchlistModel.findByIdAndUpdate(id, dto, {
            new: true,
            runValidators: true,
        })
    }

    delete(id: string) {
        return WatchlistModel.findByIdAndDelete(id)
    }
}