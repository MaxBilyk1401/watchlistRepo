import { Schema, model, InferSchemaType } from 'mongoose'

const watchlistSchema = new Schema(
    {
        title: { type: String, required: true, minlength: 3, trim: true },
        status: {
            type: String,
            enum: ['planned', 'watching', 'done'],
            required: true,
        },
        rating: { type: Number, min: 0, max: 10 },
        note: { type: String, trim: true },
    },
    { timestamps: true }
)

export type WatchlistDoc = InferSchemaType<typeof watchlistSchema>
export const WatchlistModel = model('Watchlist', watchlistSchema)