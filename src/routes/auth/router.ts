/**
 * This file contains the code required to
 * authenticate users.
 */
import express from 'express';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { jwtConfig } from '../../config/config';

const router = express.Router();

router.post('/', (req: express.Request, res: express.Response, next?: express.NextFunction) => {
	const { username = null, password = null } = req.body;

	if (!username) {
		res.status(400).json({
			error: 'Username is required',
		});
		return;
	}

	if (!password) {
		res.status(400).json({
			error: 'Password is required',
		});
		return;
	}

	/**
	 * Sign JWT
	 */
	const token = jwt.sign({}, jwtConfig.secret, {
		...jwtConfig.options,
		algorithm: 'HS256',
	});

	/**
	 * Attach additonal props and send JWT
	 */
	res.status(200).json({
		access_token: token,
		expires_at: moment().add(jwtConfig.options.expiresIn, 'seconds').format('x'),
		expires_in: jwtConfig.options.expiresIn,
		token_type: 'bearer',
	});
});

export default router;
