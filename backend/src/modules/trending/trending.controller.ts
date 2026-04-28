import { Router } from 'express'
import { authMiddleware } from '../../middlewares/auth.middleware'
import { TrendingService } from './trending.service'

const router = Router()
const service = new TrendingService()

router.get('/today', async (req, res) => {
    const today = new Date().toISOString().slice(0, 10)
    const snapshot = await service.getByDate(today)
    if (!snapshot) return res.status(404).json({ message: 'No snapshot for today yet' })
    res.json(snapshot)
})

router.get('/history', async (req, res) => {
    const snapshots = await service.getHistory()
    res.json(snapshots)
})

router.get('/:date', async (req, res) => {
    const snapshot = await service.getByDate(req.params.date)
    if (!snapshot) return res.status(404).json({ message: 'Snapshot not found for this date' })
    res.json(snapshot)
})

router.post('/fetch', authMiddleware, async (req, res) => {
    const snapshot = await service.fetchAndSave()
    res.status(201).json(snapshot)
})

export const trendingRouter = router