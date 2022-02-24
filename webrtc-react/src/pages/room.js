import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Toolbar } from "../components/toolbar";
import { VideoContainer } from "../components/videosContainer";
import { iceServers, videoConstraints } from "../data/config";
import history from '../history';
import styled from "styled-components";
import mixins from "../styles/mixins";
import theme from "../styles/theme";

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

// const GridContainer = styled.div`
//     ${mixins.flexCentre};
//     width: -webkit-fill-available;
//     `;

const VideoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25%, 1fr));
    grid-gap: 24px;
    padding: 24px 24px 64px;
    width: -webkit-fill-available;
    place-items: center;
    @media screen and (max-width: ${theme.breakpoints.tablet}) {
        grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
    }
    @media screen and (max-width: ${theme.breakpoints.mobile}) {
        grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    }
`;

const RoomWrapper = styled.div`
    display: flex;
    width: -webkit-fill-available;
    height: 100vh;
    padding-bottom: ;
    background-color: ${theme.colours.black};
    @media screen and (max-width: ${theme.breakpoints.mobile}) {
        align-items: center;
        justify-content: center;
    }
`;

const ChatWrapper = styled.div`

    margin-left:auto;
    display: flex;
    flex-direction: column;
    width: 400px;
    min-width: 200px;
    height: 100%;
    background-color: ${theme.colours.darkBlue};
    @media screen and (max-width: ${theme.breakpoints.mobile}) {
        display:none;
        position: absolute;
        left: 0;
        width: 100vw;
        & .active {
            display: flex;
        }
    }
`;

export const Room = () => {

    const connection = useRef(new window.RTCMultiConnection());
    const grid = useRef(null);
    const [streams, setStreams] = useState();

    useEffect(() => {
        connection.current.socketURL = "https://localhost:9001/";
        connection.current.socketMessageEvent = "video-conference-demo";
        connection.current.session = {
            audio: true,
            video: true,
        };
        connection.current.openOrJoin('room1');
        connection.current.onstream = (event) => {
            console.log(event);
            setStreams(event.mediaElement);
            console.log(grid.current);
            let a = document.createElement('div')
            a.appendChild(event.mediaElement);
            grid.current.append(
                a.attributes.removeNamedItem('controls')
                // <VideoContainer src={event.mediaElement} />
            )
        }
    }, []);

    return (
        <RoomWrapper>
            {/* <GridContainer> */}
            <VideoGrid ref={grid}>
                {/* unpack streams array of elements */}

            </VideoGrid>
            {/* </GridContainer> */}
            <ChatWrapper />
            <Toolbar />
        </RoomWrapper>
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
    //     history.push(`/ room / ${ roomid }?open = true`);
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

