import { Schema, model, InferSchemaType } from 'mongoose'

const movieSchema = new Schema(
    {
        tmdbId: { type: Number, required: true },
        title: { type: String, required: true },
        overview: { type: String },
        posterPath: { type: String },
        voteAverage: { type: Number },
        rank: { type: Number, required: true }
    },
    { _id: false }
)

const trendingSnapshotSchema = new Schema(
    {
        date: { type: String, required: true, unique: true },
        movies: [movieSchema],
        fetchedAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
)

export type TrendingDoc = InferSchemaType<typeof trendingSnapshotSchema>
export const TrendingModel = model('Trending', trendingSnapshotSchema)