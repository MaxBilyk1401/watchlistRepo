import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { WatchlistService } from './watchlist.service';

const router = Router()
const service = new WatchlistService()

router.get('/', (req, res) => { 
    res.json(service.findAll())
})

router.post('/', authMiddleware, (req, res) => { 
    const { title, status, rating, note } = req.body

    if (!title || title.length < 3) {
        return res.status(400).json({ message: 'Title must be at least 3 characters long' })
    }

    if (!['planned', 'watching', 'done'].includes(status)) { 
        return res.status(400).json({ message: 'Invalid status' })
    }

    const item = service.create({ title, status, rating, note })
    res.status(201).json(item)
})

export const watchlistRouter = router