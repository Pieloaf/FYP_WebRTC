const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const cors = require('cors');

const ioServer = require('socket.io');
const RTCMultiConnectionServer = require('rtcmulticonnection-server');

const jsonPath = {
    config: 'config.json',
    logs: 'logs.json'
};

const PORT = 9001;
const BASH_COLORS_HELPER = RTCMultiConnectionServer.BASH_COLORS_HELPER;
const getValuesFromConfigJson = RTCMultiConnectionServer.getValuesFromConfigJson;
const getBashParameters = RTCMultiConnectionServer.getBashParameters;

var config = getValuesFromConfigJson(jsonPath);
config = getBashParameters(config, BASH_COLORS_HELPER);

const ServerOptions = {
    key: fs.readFileSync(config.sslKey),
    cert: fs.readFileSync(config.sslCert),
    ca: ""
};


app.enable('trust proxy');
app.use(cors());


app.use(express.static('build'));
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname + '../webrtc-react/build' });
})

var server = https.createServer(ServerOptions, app)
RTCMultiConnectionServer.beforeHttpListen(server, config);

server = server.listen(PORT, function () {
    RTCMultiConnectionServer.afterHttpListen(server, config);
});

server.on('error', (err) => { console.log(err) })

ioServer(server).on('connection', function (socket) {
    RTCMultiConnectionServer.addSocket(socket, config);

    // ----------------------
    // below code is optional

    const params = socket.handshake.query;

    if (!params.socketCustomEvent) {
        params.socketCustomEvent = 'custom-message';
    }

    socket.on(params.socketCustomEvent, function (message) {
        socket.broadcast.emit(params.socketCustomEvent, message);
    });
});