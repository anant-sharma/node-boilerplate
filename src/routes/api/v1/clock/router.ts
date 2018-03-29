/**
 * Import Dependencies
 */
import * as express from 'express';
import { Clock } from './module';

/**
 * Initialize Router
 */
const router = express.Router();

/**
 * Bind Routes
 */
router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {

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

    if (next) { next(); }

});

/**
 * Export Module
 */
export default router;
