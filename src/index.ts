/**
 * Module Dependencies
 */
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { Logger } from './common/logger';
import { Config } from './config/config';
import router from './routes/router';

const initAppServer = () => {
	const app = express();

	/**
	 * App Middlewares
	 */
	app.use(morgan('dev'));
	app.use(cors());
	app.use(helmet());
	app.use(express.json({ limit: 524288000 }));
	app.use(express.urlencoded({ extended: true, limit: 524288000 }));

	app.use(router);

	app.listen(Config.App.port, () => {
		Logger.Info(`Server Started on Port ${Config.App.port}`);
	});
};

const init = () => {
	Config.Init();
	Logger.Init();
	initAppServer();
};
init();
