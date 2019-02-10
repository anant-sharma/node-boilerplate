/**
 * Module Dependencies
 */
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as grpc from 'grpc';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import { appConfig } from './config/config';
import { addServices as addGrpcServices } from './grpc/';
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

const initGrpcServer = () => {
    const server = new grpc.Server();

    addGrpcServices(server);

    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();

    console.log(`GRPC Server Started on Port 50051`);
};

const init = () => {
    initAppServer();
    initGrpcServer();
};
init();
