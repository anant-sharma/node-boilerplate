/**
 * This file contains the code required to
 * authenticate users.
 */
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { has } from 'lodash';
import * as moment from 'moment';
import { jwtConfig } from '../../config/config';

const router = express.Router();

router.post(
    '/',
    (
        req: express.Request,
        res: express.Response,
        next?: express.NextFunction
    ) => {
        if (!has(req.body, 'username')) {
            res.status(400).json({
                error: 'Username is required',
            });
            if (next) {
                next();
            }
            return;
        }
        if (!has(req.body, 'password')) {
            res.status(400).json({
                error: 'Password is required',
            });
            if (next) {
                next();
            }
            return;
        }

        /**
         * Sign JWT
         */
        const token = jwt.sign({}, jwtConfig.secret, jwtConfig.options);

        /**
         * Attach additonal props and send JWT
         */
        res.status(200).json({
            access_token: token,
            expires_at: moment()
                .add(jwtConfig.options.expiresIn, 'seconds')
                .format('x'),
            expires_in: jwtConfig.options.expiresIn,
            token_type: 'bearer',
        });
    }
);

export default router;
