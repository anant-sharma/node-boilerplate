import * as grpc from 'grpc';

import { addProtoService as clockProtoService } from './v1/clock';

export function addServices(server: grpc.Server): void {
    /**
     * Bind Services to server
     */
    clockProtoService(server);
}
