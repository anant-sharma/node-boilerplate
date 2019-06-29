/**
 * This file contins the config
 * required to run the app
 */
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

/**
 * App Config
 */
export const appConfig = {
    auth: false,
    http2port: Number(process.env.HTTP2_PORT) || 21001,
    port: Number(process.env.PORT) || 21000,
};

/**
 * DB Connection
 */
export const dbConfig = {
    connectionString: process.env.dbConnectionString || '',
};

/**
 * JWT Config
 */
export const jwtConfig = {
    options: {
        algorithm: 'HS256',
        expiresIn: 3600,
        issuer: 'Chipserver',
    },
    secret: 'appsecret',
};

/**
 * Paths
 */
export const paths = {
    whitelisted: ['/auth'],
};

/**
 * MQ Config
 */
export const mqConfig = {
    url: process.env.mqConnectionString || 'amqp://localhost:5672',
};
