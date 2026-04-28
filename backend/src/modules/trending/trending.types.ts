export interface TmdbMovie {
    id: number
    title: string
    overview: string
    poster_path: string | null
    vote_average: number

}

export interface TmdbTrendingResponse {
    results: TmdbMovie[]
}

export interface TrendingMovieEntry {
    tmdbId: number
    title: string
    overview: string
    posterPath: string | null
    voteAverage: number
    rank: number
}

export interface TrendingSnapshot {
    date: string
    movies: TrendingMovieEntry[]
    fetchedAt: Date
}