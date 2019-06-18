var PROTO_PATH = __dirname + '/protos/v1/clock.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
var v1 = grpc.loadPackageDefinition(packageDefinition).v1;

function main() {
    var client = new v1.Clock('localhost:50051', grpc.credentials.createInsecure());
    client.getTimeStamp({}, function(err, response) {
        if (err) {
            console.trace(err);
            return;
        }
        console.log(response);
    });
}

setInterval(main, 2000);
main();
