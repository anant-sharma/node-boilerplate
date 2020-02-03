/**
 * This file contains the code required to
 * setup jaeger tracing compatible with open tracing.
 */
import { initTracer } from 'jaeger-client';
import { Tracer } from 'opentracing';

export class Tracing {
    public static tracer: Tracer;

    public static init() {
        const config = {
            // reporter: {
            //     // Provide the traces endpoint; this forces the client to connect directly to the Collector and send
            //     // spans over HTTP
            //     collectorEndpoint: 'http://jaeger-collector:14268/api/traces',
            //     // Provide username and password if authentication is enabled in the Collector
            //     // username: '',
            //     // password: '',
            // },
            sampler: {
                param: 1,
                type: 'const',
            },
            serviceName: 'node-boilerplate',
        };
        const options = {
            tags: {
                'node-boilerplate.version': '0.0.1',
            },
        };
        this.tracer = initTracer(config, options);
    }
}
