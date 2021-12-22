/**
 * This file contains the functional code
 * pertaining to clock class
 */

/**
 * Module Dependencies
 */
import moment from 'moment';

export class Clock {
	public timestamp: any;

	constructor() {
		this.timestamp = moment().format();
	}

	public getTimestamp() {
		return this.timestamp;
	}
}
