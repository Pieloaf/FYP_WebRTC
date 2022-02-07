import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Toolbar } from "../components/toolbar";
import { VideoContainer } from "../components/videosContainer";
import { iceServers, videoConstraints } from "../data/config";
import history from '../history';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');


export const Room = () => {
    return (
        <div>
            test
        </div>
    )
    // const [streamOpts, setStreamOpts] = useState({
    //     resolution: 0,
    //     bitrate: 512,
    //     isMicOn: true,
    //     isCamOn: true,
    // })
    // const [roomID, setRoomID] = useState(useParams().roomID || null);

    // const [streams, setStreams] = useState([]);

    // const prevStreamOpts = usePrevious(streamOpts);
    // const connection = useRef(new window.RTCMultiConnection());

    // useEffect(() => {
    //     function initConnection() {
    //         connection.current.socketMessageEvent = "webrtc-react-app"
    //         connection.current.mediaConstraints = {
    //             video: videoConstraints[streamOpts.resolution],
    //             audio: true,
    //         }
    //         connection.current.session = {
    //             audio: streamOpts.isMicOn,
    //             video: streamOpts.isCamOn,
    //             screen: true
    //         }
    //         connection.current.onstream = (event) => {
    //             console.log(event);
    //             setStreams([...streams.streams, event.stream])
    //         }
    //         connection.current.processSdp = (sdp) => {
    //             let CodecsHandler = connection.current.CodecsHandler;
    //             var codecs = 'vp8';

    //             sdp = CodecsHandler.preferCodec(sdp, codecs.toLowerCase());

    //             sdp = CodecsHandler.setApplicationSpecificBandwidth(sdp, {
    //                 audio: 512,
    //                 video: streamOpts.bitrate,
    //                 screen: streamOpts.bitrate,
    //             });

    //             sdp = CodecsHandler.setVideoBitrates(sdp, {
    //                 min: streamOpts.bitrate * 8 * 1024,
    //                 max: streamOpts.bitrate * 8 * 1024,
    //             });

    //             return sdp;
    //         }
    //         connection.current.iceServers = iceServers;
    //     };
    //     //on first render call initConnection
    //     if (streams.length === 0) {
    //         initConnection();
    //     }
    //     //on every render check if streamOpts changed
    //     if (prevStreamOpts !== streamOpts) {
    //         connection.current.mediaConstraints = {
    //             video: videoConstraints[streamOpts.resolution],
    //             audio: true,
    //         }
    //         connection.current.session = {
    //             audio: streamOpts.isMicOn,
    //             video: streamOpts.isCamOn,
    //         }
    //     }
    // });

    // const handleOpenRoom = () => {
    //     let roomid = genRanHex(16);
    //     history.push(`/room/${roomid}?open=true`);
    // }
    // // if (open) {
    // //     return (
    // //         <div className="room-container">
    // //             <Toolbar />
    // //             <VideoContainer streams={streams} />
    // //         </div>
    // //     )
    // // }
    // return (

    //     <div>
    //         <h1>Room</h1>
    //         <VideoContainer streams={streams} />
    //         {streams.length ? <Toolbar /> : <button onClick={() => {
    //             handleOpenRoom()
    //         }
    //         }>Open New Room</button>}
    //     </div >
    // );
}

