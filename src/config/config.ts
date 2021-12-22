/**
 * This file contins the config
 * required to run the app
 */
import { config as dotenvConfig } from 'dotenv';

export class Config {
	public static Init() {
		dotenvConfig();
	}

	public static App = {
		auth: false,
		port: Number(process.env.PORT) || 8080,
	};

	public static DB = {
		connectionString: process.env.dbConnectionString || '',
	};

	public static JWT = {
		options: {
			algorithm: 'HS256',
			expiresIn: 365 * 3600,
			issuer: 'Chipserver',
		},
		secret: 'appsecret',
		paths: {
			whitelisted: ['/auth'],
		},
	};

	public static NewRelic = {
		appName: process.env.NEW_RELIC_APP_NAME || process.env.npm_package_name,
		licenseKey: process.env.NEW_RELIC_LICENSE_KEY || '',
	};
}
