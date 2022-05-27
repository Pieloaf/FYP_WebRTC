// importing required modules
const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const io = require('socket.io');
const RTCMultiConnectionServer = require('rtcmulticonnection-server');

const PORT = 443; // setting port variable

// colour text for console logs
const BASH_COLORS_HELPER = RTCMultiConnectionServer.BASH_COLORS_HELPER;

// loading socket io settings from config file
var config = RTCMultiConnectionServer.
    getValuesFromConfigJson({ config: 'config.json' });

// setting bash terminal settings from config
config = RTCMultiConnectionServer.
    getBashParameters(config, BASH_COLORS_HELPER);

// setting server ssl certificate and key
const ServerOptions = {
    key: fs.readFileSync(config.sslKey),
    cert: fs.readFileSync(config.sslCert)
};

// used in the case of server sitting behind a proxy
app.enable('trust proxy');

// setting cors (cross origin resource sharing)
// used to allow requests from other domains
app.use(cors());

// setting express making static build directory public
app.use(express.static('build'));

// on any get request, send index.html from build directory
app.get('/*', (req, res) => {
    res.sendFile('index.html', { root: __dirname + '/build' });
})

// create the https server
var server = https.createServer(ServerOptions, app)

// passing server object and config to RTCMultiConnectionServer
RTCMultiConnectionServer.beforeHttpListen(server, config);

// start server lisening on port
server = server.listen(PORT, function () {
    // setting a lisener function to be handled by RTCMultiConnectionServer
    RTCMultiConnectionServer.afterHttpListen(server, config);
});

// on server error log the error
server.on('error', (err) => { console.log(err) })

// setting socket io to listen on server with cors and any origin
io(server, { cors: true, origins: '*:*' }).
    // on connection event 
    on('connection', function (socket) {

        // add socket io object to RTCMultiConnectionServer
        RTCMultiConnectionServer.addSocket(socket, config);

        // allowing custom events to be emitted
        const params = socket.handshake.query;
        if (!params.socketCustomEvent) {
            params.socketCustomEvent = 'custom-message';
        }

        // on customs event 
        socket.on(params.socketCustomEvent, function (message) {
            // broadcast to all clients the event type and message
            socket.broadcast.emit(params.socketCustomEvent, message);
        });
    });

