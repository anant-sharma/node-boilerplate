/**
 * Module Dependencies
 */
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { appConfig } from './config/config';
import router from './routes/router';

const initAppServer = () => {
	const app = express();

	/**
	 * App Middlewares
	 */
	app.use(morgan('dev'));
	app.use(cors());
	app.use(helmet());
	app.use(bodyParser.json({ limit: 524288000 }));
	app.use(bodyParser.urlencoded({ extended: true, limit: 524288000 }));

	app.use(router);

	app.listen(appConfig.port, () => {
		console.log(`Server Started on Port ${appConfig.port}`);
	});
};

const init = () => {
	initAppServer();
};
init();
