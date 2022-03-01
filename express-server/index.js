const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const io = require('socket.io');
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

const allowedOrigins = ['https://localhost:9001', 'https://localhost:3000'];
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.enable('trust proxy');
app.use(cors());


app.use(express.static('build'));
app.get('/*', (req, res) => {
    res.sendFile('index.html', { root: __dirname + '/build' });
})

var server = https.createServer(ServerOptions, app)
RTCMultiConnectionServer.beforeHttpListen(server, config);

server = server.listen(PORT, function () {
    RTCMultiConnectionServer.afterHttpListen(server, config);
});

server.on('error', (err) => { console.log(err) })

io(server, { cors: true, origins: '*:*' }).on('connection', function (socket) {
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