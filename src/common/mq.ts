/**
 * This file contains the code required to
 * establish connection and perform operations
 * with messaging queue.
 */

import * as amqp from 'amqplib';

export class MQ {
    public static conn: amqp.Connection;

    public static connect(): Promise<amqp.Connection> {
        return new Promise(async (resolve, reject) => {
            amqp.connect('amqp://35.202.46.144:5672')
                .then(conn => {
                    this.conn = conn;
                })
                .catch(e => {
                    reject(e);
                });

            console.log('Attempting MQ Conn');
            resolve(this.conn);
        });
    }
}
