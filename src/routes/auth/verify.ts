/**
 * This file contains the code required to
 * verify the integrity of request by checking JWT
 */
import * as express from 'express';
import jwt from 'jsonwebtoken';
import * as _ from 'lodash';
import { Logger } from '../../common/logger';
import { Config } from '../../config/config';

export default (req: any, res: any, next?: express.NextFunction) => {
	/**
	 * If the requested path (req.path) is not an un-protected path
	 */
	if (Config.App.auth && !_.includes(Config.JWT.paths.whitelisted, req.path)) {
		let token;

		try {
			/**
			 * Check for Authorization Token
			 */
			if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
				token = req.headers.authorization.split(' ')[1];
			} else if (req.query && req.query.token) {
				token = req.query.token;
			}
		} catch (e) {
			Logger.Error('Authorization Token is required.');
			res.status(401).send({
				error: 'Authorization Token is required.',
				status: 'error',
			});
			return;
		}

		/**
		 * Verify JWT Token
		 */
		jwt.verify(token, Config.JWT.secret, Config.JWT.options, (err, decoded) => {
			if (err) {
				Logger.Error('A valid authorization token is required.');
				res.status(401).send({
					error: 'A valid authorization token is required.',
					status: 'error',
				});
				return;
			}

			if (next) {
				next();
			}
		});
	} else {
		if (next) {
			next();
		}
	}
};
