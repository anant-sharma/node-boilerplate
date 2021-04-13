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
	port: Number(process.env.PORT) || 8080,
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
		expiresIn: 365 * 3600,
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
