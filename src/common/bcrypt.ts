/**
 * This module contains the bcrypt
 * implementation used in application
 */
import * as bcrypt from 'bcryptjs';

export class Bcrypt {
    private saltRounds: number;

    constructor() {
        this.saltRounds = 10;
    }

    public encrypt(plainText: string) {
        return bcrypt.hash(plainText, this.saltRounds);
    }

    public compare(plainText: string, hash: string) {
        return bcrypt.compare(plainText, hash);
    }
}

export default new Bcrypt();
