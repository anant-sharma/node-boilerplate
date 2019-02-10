import * as protoLoader from '@grpc/proto-loader';
import * as grpc from 'grpc';
import * as path from 'path';
import { Clock } from '../../../modules/v1/clock';

const PROTO_PATH = path.join(__dirname, '../../../../protos/v1/clock.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    defaults: true,
    enums: String,
    keepCase: true,
    longs: String,
    oneofs: true,
});
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const v1ProtoDescriptor: any = protoDescriptor.v1;

function getTimeStamp(call: grpc.Call, callback: any) {
    /**
     * Create clock
     */
    const clock = new Clock();

    /**
     * Get Timestamp
     */
    try {
        const timestamp = clock.getTimestamp();
        callback(null, { timestamp });
    } catch (e) {
        callback(e);
    }
}

export const addProtoService = (server: grpc.Server): void => {
    server.addService(v1ProtoDescriptor.Clock.service, {
        GetTimeStamp: getTimeStamp,
    });
};
