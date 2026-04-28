import { TrendingModel } from './trending.model'
import type { TmdbMovie, TrendingMovieEntry, TmdbTrendingResponse } from './trending.types'

export class TrendingService {
    private getTodayDate(): string {
        return new Date().toISOString().slice(0, 10)
    }

    private async fetchFromTmdb(): Promise<TmdbMovie[]> {
        const token = process.env.TMDB_TOKEN
        if (!token) throw new Error('TMDB token not set in environment variables')

        const response = await fetch('https://api.themoviedb.org/3/trending/movie/day', {
            headers: {
                Authorization: `Bearer ${token}`,
                accept: 'application/json',
            }
        })

        if (!response.ok) throw new Error(`TMDB request failed ${response.status} ${response.statusText}`)

        const data = (await response.json()) as TmdbTrendingResponse
        return data.results
    }

    async fetchAndSave() {
        const movies = await this.fetchFromTmdb()

        const trendingMovies: TrendingMovieEntry[] = movies.slice(0, 20).map((movie, index) => ({
            tmdbId: movie.id,
            title: movie.title,
            overview: movie.overview,
            posterPath: movie.poster_path,
            voteAverage: movie.vote_average,
            rank: index + 1
        }))

        const snapshot = {
            date: this.getTodayDate(),
            movies: trendingMovies,
            fetchedAt: new Date()
        }

        return TrendingModel.findOneAndUpdate(
            { date: snapshot.date },
            snapshot,
            { upsert: true, new: true, runValidators: true }
        )
    }

    getHistory(limit: number = 30) {
        return TrendingModel.find({}, { date: 1, fetchedAt: 1 })
            .sort({ date: -1 })
            .limit(limit)
    }

    getByDate(date: string) {
        return TrendingModel.findOne({ date })
    }
}