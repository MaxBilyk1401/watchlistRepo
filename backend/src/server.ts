import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { watchlistRouter } from './modules/watchlist/watchlist.controller'
import e from 'express'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/watchlist', watchlistRouter)

app.use((req, res) => {
    res.status(404).json({ message: 'Server not found' })
})

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => { 
    console.error(err)
    res.status(500).json({ message: 'Oops, something went wrong' })
})

const port = process.env.PORT || 4200
app.listen(port, () => { 
    console.log(`Server is running on port ${port}`)
})