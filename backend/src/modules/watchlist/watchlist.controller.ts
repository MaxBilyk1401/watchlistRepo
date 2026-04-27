import { Router } from 'express'
import mongoose from 'mongoose'
import { authMiddleware } from '../../middlewares/auth.middleware'
import { WatchlistService } from './watchlist.service'

const router = Router()
const service = new WatchlistService()

router.get('/', async (req, res) => {
    const items = await service.findAll()
    res.json(items)
})

router.get('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ message: 'Invalid ID' })
    }

    const item = await service.findById(req.params.id)
    if (!item) return res.status(404).json({ message: 'Item not found' })
    res.json(item)
})

router.post('/', authMiddleware, async (req, res) => {
    const item = await service.create(req.body)
    res.status(201).json(item)
})

router.patch<{ id: string }>('/:id', authMiddleware, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ message: 'Invalid id' })
    }
    const item = await service.update(req.params.id, req.body)
    if (!item) return res.status(404).json({ message: 'Not found' })
    res.json(item)
})

router.delete<{ id: string }>('/:id', authMiddleware, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ message: 'Invalid id' })
    }
    const item = await service.delete(req.params.id)
    if (!item) return res.status(404).json({ message: 'Not found' })
    res.status(204).send()
})

export const watchlistRouter = router