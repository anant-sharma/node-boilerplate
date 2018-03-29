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
import clockRouter from './clock/router';

/**
 * Bind Routes
 */
router.use('/clock', clockRouter);

/**
 * Export Module
 */
export default router;
