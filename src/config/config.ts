/**
 * This file contins the config
 * required to run the app
 */

/**
 * App Config
 */
export const appConfig = {
    auth: false,
    port: 21000,
};

/**
 * DB Connection
 */
export const dbConfig = {
    connectionString: process.env.dbConnectionString || '',
    // connectionString: `mongodb://<username>:<password>@chipserver.ml:27017/fleet-management?authSource=admin`,
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
