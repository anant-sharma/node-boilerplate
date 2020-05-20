/**
 * This file contains the test case required
 * to test clock implementation
 */
import moment from 'moment';
import { Clock } from './';

test('It should create instance of Clock', () => {
	expect(new Clock()).toBeInstanceOf(Clock);
});

test('It should return current time', () => {
	const clock = new Clock();
	expect(Number(clock.getTimestamp())).toBeLessThanOrEqual(Number(moment().format('x')));
});
