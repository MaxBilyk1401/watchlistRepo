import cron from 'node-cron'
import { TrendingService } from './trending.service'

export function startTrendingCron(service: TrendingService) {
    cron.schedule('0 12 * * *', async () => {
        console.log('[trending-cron] Running daily fetch...')
        try {
            const snapshot = await service.fetchAndSave()
            console.log(`[trending-cron] Saved snapshot for ${snapshot?.date}`)
        } catch (err) {
            console.error('[trending-cron] Failed:', err)
        }
    })
}