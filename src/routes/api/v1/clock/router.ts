/**
 * Import Dependencies
 */
import * as express from 'express';
import { Clock } from '../../../../controllers/v1/clock';

/**
 * Initialize Router
 */
const router = express.Router();

/**
 * Bind Routes
 */
router.get('/', (req: express.Request, res: express.Response) => {
    /**
     * Create clock
     */
    const clock = new Clock();

    /**
     * Get Timestamp
     */
    try {
        const timestamp = clock.getTimestamp();
        res.status(200).json({
            timestamp,
        });
    } catch (e) {
        res.status(400).json({
            error: e,
        });
    }
});

/**
 * Export Module
 */
export default router;
