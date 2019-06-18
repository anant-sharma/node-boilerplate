/**
 * Module Dependencies
 */
import * as bodyParser from 'body-parser';
import { exec } from 'child_process';
import * as cors from 'cors';
import * as express from 'express';
import * as fs from 'fs-extra';
import * as grpc from 'grpc';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as path from 'path';
import * as spdy from 'spdy';
import * as util from 'util';
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

const initHTTP2Server = async () => {
    const certDir = path.join(__dirname, '..', 'certs');

    const serverKeyFilePath = certDir + '/server.key';
    const certFilePath = certDir + '/server.crt';

    /**
     * Ensure Certificate Files are present. If not present, generate them.
     */
    await ensureCertificates(serverKeyFilePath, certFilePath);

    const options = {
        cert: fs.readFileSync(certFilePath),
        key: fs.readFileSync(serverKeyFilePath),
    };

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

    spdy.createServer(options, app).listen(appConfig.http2port, (err: Error) => {
        if (err) {
            console.trace(err);
            return process.exit(1);
        }

        console.log(`HTTP2 Server Started on Port ${appConfig.http2port}`);
    });
};

const ensureCertificates = (serverKeyFilePath: string, certFilePath: string) => {
    return new Promise(async (resolve, reject) => {
        const serverKeyFilePathExists = await fs.pathExists(serverKeyFilePath).catch(e => console.trace(e));
        const certFilePathExists = await fs.pathExists(certFilePath).catch(e => console.trace(e));

        if (!(serverKeyFilePathExists && certFilePathExists)) {
            const certDir = path.join(__dirname, '..', 'certs');
            await util.promisify(exec)(`sh ${certDir}/cert-gen.sh`);
        }

        resolve();
    });
};

const init = () => {
    initAppServer();
    initGrpcServer();
    initHTTP2Server();
};
init();
