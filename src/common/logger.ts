import axios, { AxiosRequestConfig } from 'axios';
import os from 'os';
import { Config } from '../config/config';

export class Logger {
	private static NEWRELIC_API_ENDPOINT = 'https://log-api.newrelic.com/log/v1';

	public static Init() {
		require('newrelic');
	}

	public static Info(message: any) {
		Logger.log('info', [
			{
				timestamp: new Date(),
				message,
			},
		]);
	}

	public static Error(message: any) {
		Logger.log('error', [
			{
				timestamp: new Date(),
				message,
			},
		]);
	}

	public static Trace(message: any) {
		Logger.log('trace', [
			{
				timestamp: new Date(),
				message,
			},
		]);
	}

	private static log(level: string, logs: object[]) {
		if (!Config.NewRelic.licenseKey) {
			return;
		}

		const config: AxiosRequestConfig<any> = {
			method: 'post',
			url: this.NEWRELIC_API_ENDPOINT,
			headers: {
				'X-License-Key': Config.NewRelic.licenseKey,
				'Content-Type': 'application/json',
			},
			data: [
				{
					common: {
						attributes: {
							logtype: level,
							service: Config.NewRelic.appName,
							version: process.env.npm_package_version,
							hostname: os.hostname(),
						},
					},
					logs,
				},
			],
		};

		axios(config).catch((error) => {
			console.error(error);
		});
	}
}
