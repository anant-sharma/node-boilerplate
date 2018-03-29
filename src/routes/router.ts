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
import apiRouter from './api/api-router';
import authRouter from './auth/router';
import authVerify from './auth/verify';

/**
 * Initialize Middlewares
 */
router.use(authVerify);

/**
 * Bind Routes
 */
router.use('/api', apiRouter);
router.use('/auth', authRouter);

/**
 * Export Module
 */
export default router;
