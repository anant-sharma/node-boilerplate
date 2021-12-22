/**
 * This file contains the functional code
 * pertaining to clock class
 */

/**
 * Module Dependencies
 */
import moment from 'moment';

export class Clock {
	public static getTimestamp() {
		return moment().format();
	}
}
