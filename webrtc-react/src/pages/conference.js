import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Toolbar } from "../components/toolbar";
import { VideoContainer } from "../components/videosContainer";
import { videoConstraints } from "../data/config";

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');


export const Conference = () => {
    const [streamOpts, setStreamOpts] = useState({
        resolution: 0,
        bitrate: 512,
        isMicOn: true,
        isCamOn: true,
    })
    const [streams, setStreams] = useState([]);

    const prevStreamOpts = usePrevious(streamOpts);
    const connection = useRef(new window.RTCMultiConnection());
    var roomID = useParams().roomID;

    useEffect(() => {
        function initConnection() {
            connection.current.socketURL = "https://localhost:9001/"
            connection.current.socketMessageEvent = "webrtc-react-app"
            connection.current.mediaConstraints = {
                video: videoConstraints[streamOpts.resolution],
                audio: true,
            }
            connection.current.session = {
                audio: streamOpts.isMicOn,
                video: streamOpts.isCamOn,
            }
            connection.current.onstream = (event) => {
                console.log(event);
                setStreams([...streams.streams, event.stream])
            }
            connection.current.processSdp = (sdp) => {
                let CodecsHandler = connection.current.CodecsHandler;
                var codecs = 'vp8';

                sdp = CodecsHandler.preferCodec(sdp, codecs.toLowerCase());

                sdp = CodecsHandler.setApplicationSpecificBandwidth(sdp, {
                    audio: 128,
                    video: streamOpts.bitrate,
                    screen: streamOpts.bitrate,
                });

                sdp = CodecsHandler.setVideoBitrates(sdp, {
                    min: streamOpts.bitrate * 8 * 1024,
                    max: streamOpts.bitrate * 8 * 1024,
                });

                return sdp;
            }
            connection.current.iceServers = [{
                'urls': [
                    'stun:stun.l.google.com:19302',
                    'stun:stun1.l.google.com:19302',
                    'stun:stun2.l.google.com:19302',
                    'stun:stun.l.google.com:19302?transport=udp'
                ]
            }]
        };
        //on first render call initConnection
        if (streams.length === 0) {
            initConnection();
        }
        //on every render check if streamOpts changed
        if (prevStreamOpts !== streamOpts) {
            connection.current.mediaConstraints = {
                video: videoConstraints[streamOpts.resolution],
                audio: true,
            }
            connection.current.session = {
                audio: streamOpts.isMicOn,
                video: streamOpts.isCamOn,
            }
        }
    });

    return (
        <div>
            <h1>Conference </h1>
            <VideoContainer streams={streams} />
            {streams.length ? <Toolbar /> : <button onClick={() => {
                roomID = roomID === undefined ? genRanHex(6) : roomID;
                connection.current.open(roomID, function (isRoomOpened, roomid, error) {
                    if (isRoomOpened === true) {
                        console.log('conference started')
                        // showRoomURL(connection.sessionid);
                    }
                    else {
                        // disableInputButtons(true);
                        if (error === 'Room not available') {
                            alert('Someone already created this room. Please either join or create a separate room.');
                            return;
                        }
                        alert(error);
                    }
                })
                console.log(connection.current.streams)
            }}>{roomID === undefined ? `Open Room` : `Join Room`}</button>}
        </div >
    );
}

