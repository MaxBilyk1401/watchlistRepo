import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { watchlistRouter } from './modules/watchlist/watchlist.controller'
import { trendingRouter } from './modules/trending/trending.controller'
import { TrendingService } from './modules/trending/trending.service'
import { startTrendingCron } from './modules/trending/trending.cron'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/watchlist', watchlistRouter)
app.use('/api/trending', trendingRouter)

app.use((req, res) => {
    res.status(404).json({ message: 'Server not found' })
})

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message })
    }
    console.error(err.stack)
    res.status(500).json({ message: 'Oops, something went wrong' })
})

const port = process.env.PORT || 4200
const mongoUri = process.env.MONGO_URI

async function start() {
    if (!mongoUri) throw new Error('Mongo_URI is not set')
    await mongoose.connect(mongoUri)

    console.log('Connected to MongoDB')

    const trendingService = new TrendingService()
    startTrendingCron(trendingService)

    const today = new Date().toISOString().slice(0, 10)
    const existingSnapshot = await trendingService.getByDate(today)
    if (!existingSnapshot) {
        console.log('[trending] No snapshot for today, fetching initial data...')
        try {
            await trendingService.fetchAndSave()
            console.log('[trending] Initial snapshot saved')
        } catch (err) {
            console.error('[trending] Failed to fetch initial snapshot:', err)
        }
    }

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}

start().catch(err => {
    console.error('Failed to start server:', err)
    process.exit(1)
})