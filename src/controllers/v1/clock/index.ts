/**
 * This file contains the functional code
 * pertaining to clock class
 */

/**
 * Module Dependencies
 */
import * as moment from 'moment';

export class Clock {
    public timestamp: any;

    constructor() {
        this.timestamp = moment().format('x');
    }

    public getTimestamp() {
        return this.timestamp;
    }
}
