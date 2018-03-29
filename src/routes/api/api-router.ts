/**
 * Import Dependencies
 */
import * as express from 'express';

/**
 * Initialize Router
 */
const router = express.Router();

/**
 * Import Routes
 */
import v1Router from './v1/api-v1-router';

/**
 * Bind Routes
 */
router.use('/v1', v1Router);

/**
 * Export Module
 */
export default router;
