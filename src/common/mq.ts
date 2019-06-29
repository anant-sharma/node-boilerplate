/**
 * This file contains the code required to
 * establish connection and perform operations
 * with messaging queue.
 */

import * as amqp from 'amqplib';

export class MQ {
    public static conn: amqp.Connection;
    public static channel: amqp.Channel;

    public static connect(connectionString: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            amqp.connect(connectionString)
                .then((conn: amqp.Connection) => {
                    this.conn = conn;
                    resolve();
                })
                .catch((e: Error) => {
                    reject(e);
                });
        });
    }

    public static createChannel(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.conn
                .createChannel()
                .then((channel: amqp.Channel) => {
                    this.channel = channel;
                    resolve();
                })
                .catch((e: Error) => {
                    reject(e);
                });
        });
    }

    public static createExchange(
        exchangeName: string,
        type: string = 'fanout',
        options: amqp.Options.AssertExchange = {
            durable: true,
        }
    ): Promise<amqp.Replies.AssertExchange> {
        return new Promise(async (resolve, reject) => {
            this.channel
                .assertExchange(exchangeName, type, options)
                .then((ex: amqp.Replies.AssertExchange) => {
                    resolve(ex);
                })
                .catch((e: Error) => {
                    reject(e);
                });
        });
    }

    public static publish(exchange = '', queue = '', data: string) {
        this.channel.publish(exchange, queue, Buffer.from(data));
    }

    public static createQueue(
        queue: string,
        options: amqp.Options.AssertQueue = {
            durable: true,
        }
    ): Promise<amqp.Replies.AssertQueue> {
        return this.channel.assertQueue(queue, options);
    }

    public static async writeToQueue(queue = '', data: string) {
        if (!this.queues.includes(queue)) {
            await this.createQueue(queue);
            this.queues.push(queue);
        }

        this.channel.sendToQueue(queue, Buffer.from(data), {
            persistent: true,
        });
    }

    public static bindQueueWithExchange(queue: string, exchange: string) {
        return new Promise((resolve, reject) => {
            this.channel
                .bindQueue(queue, exchange, '')
                .then(() => {
                    resolve();
                })
                .catch((e: Error) => {
                    reject(e);
                });
        });
    }

    public static async establishWorker(queue: string, onMessage: any, opts: amqp.Options.Consume = {}) {
        if (!this.queues.includes(queue)) {
            await this.createQueue(queue);
            this.queues.push(queue);
        }

        this.channel.consume(
            queue,
            (msg: amqp.ConsumeMessage | null) => {
                if (msg !== null) {
                    onMessage(msg.content.toString(), msg);
                }
            },
            opts
        );
    }

    private static queues: string[] = [];
}
