/**
 * Module Dependencies
 */
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import { appConfig } from './config/config';
import router from './routes/router';

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
