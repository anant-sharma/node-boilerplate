/**
 * Import Dependencies
 */
import * as express from 'express';
import { Logger } from '../../../../common/logger';
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
	 * Get Timestamp
	 */
	try {
		const timestamp = Clock.getTimestamp();
		res.status(200).json({
			timestamp,
		});
	} catch (e) {
		Logger.Error(e);
		res.status(400).json({
			error: e,
		});
	}
});

/**
 * Export Module
 */
export default router;
