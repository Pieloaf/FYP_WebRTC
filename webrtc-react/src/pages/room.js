import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Toolbar } from "../components/toolbar";
import { ChatArea } from "../components/messages";
import { useLocation } from "react-router-dom";
import mixins from "../styles/mixins";
import theme from "../styles/theme";
import noCam from "../data/images/noCam.jpg";
import { stunServers } from "../data/config.js";

const MainContainer = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    background-color: ${theme.colours.black};
`;

const VideoGrid = styled.div`
    display: grid;
    grid-gap: 10px;
    padding: 10px;
    ${mixins.fill};
    height: -webkit-fill-available;
    grid-template-columns: ${({ cols }) => '1fr '.repeat(cols)};
    grid-template-rows: ${({ rows }) => '1fr '.repeat(rows)};
    place-items: center;
`;

const VideoContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    border-radius: 7px;
    > span{
        position: absolute;
        top: 0;
        left: 0;
        color: ${theme.colours.white};
        font-size: ${theme.fontSizes.xl};
        font-weight: bold;
        padding: 5px;
        background-color: #000000ea;
        border-radius: 7px;
        opacity: 0;
        transition: ${theme.transition}
    };
    :hover > span{
        opacity: 1;
    }
    > video {
        object-fit: ${props => props.fit};
        width: 100%;
        height: 100%;
    }
`;

export const Room = () => {

    // stateful variables
    const [cols, setCols] = useState(1);
    const [rows, setRows] = useState(1);
    const [objFit, setObjFit] = useState("contain");
    const [orientation, setOrientation] = useState("landscape");

    const [camActive, setCamActive] = useState(true);
    const [micActive, setMicActive] = useState(true);
    const [chatActive, setChatActive] = useState(false);
    const [screenActive, setScreenActive] = useState(false);

    const [streamObjs, setStreamObjs] = useState([]);

    const roomID = useLocation().pathname.split('/room/')[1];

    // refs
    const streamGrid = useRef();
    const streamRefs = useRef([]);
    const connection = useRef(new window.RTCMultiConnection());

    // inital setup
    useEffect(() => {
        // overriding default stun and turn servers
        connection.current.iceServers = stunServers;

        // ensure user name is set
        try {
            let roomData = JSON.parse(sessionStorage.getItem(roomID));
            connection.current.extra.name = roomData.name;
        } catch (e) {
            let name = prompt('Please enter your name', 'Guest');
            if (!name || !name.length) {
                name = 'Guest';
            };
            connection.current.extra.name = name;
            sessionStorage.setItem(roomID, JSON.stringify({ "name": name }));
        }

        // specify webrtc channels
        connection.current.session = {
            data: true,
            video: false,
            audio: true
        };

        // set signalling server address
        connection.current.socketURL = window.location.href.split(window.location.pathname)[0]+'/';
        // add custom socket event
        connection.current.setCustomSocketEvent("recording-status");
        // open or join room
        connection.current.openOrJoin(roomID);

        // on stream update state
        connection.current.onstream = (event) => {
            setStreamObjs(containers =>
                [...containers, {
                    "video":
                        <video ref={(ref) => { streamRefs.current.push(ref); }} autoPlay playsInline muted poster={noCam} />,
                    "stream": event.stream,
                    "id": event.userid,
                    "name": event.extra.name,
                    "muted": event.extra.muted
                }]
            );
        }

        // onuser leave update state
        connection.current.onleave = (event) => {
            // find stream and remove from state array
            setStreamObjs(streamObjs => streamObjs.filter(obj => obj.id !== event.userid));
        };

        // on mute remove stream
        connection.current.onmute = (event) => {
            if (event.muteType === 'video') {
                // find stream and remove src
                streamRefs.current.forEach(ref => {
                    if (ref.id === event.userid) {
                        ref.srcObject = null;
                    }
                });
            }
        }

        // onunmute replace stream
        connection.current.onunmute = (event) => {
            if (event.muteType === 'video') {
                // find stream and add src
                streamRefs.current.forEach(ref => {
                    if (ref.id === event.userid) {
                        ref.srcObject = event.stream;
                    }
                });
            }
        }

    }, [roomID]);

    useEffect(() => {
        // on new stream, 
        streamObjs.forEach((stream, index) => {
            // add user id attribute
            if (!streamRefs.current[index].id)
                streamRefs.current[index].id = stream.id;

            //add src to video element if not muted on join
            if (stream.muted === false) {
                streamRefs.current[index].srcObject = stream.stream;
            }
        })
    }, [streamObjs]);

    useEffect(() => {
        // resizing grid on new stream added
        // store cols and rows in temp variables
        let tempCols = cols;
        let tempRows = rows;

        // check if cols should decrememnt
        if (streamObjs.length <= (tempCols - 1) ** 2) {
            if (tempCols - 1 > 0) tempCols--;
        }
        // check if cols should increment
        else if (streamObjs.length > tempCols ** 2) tempCols++;

        // calculate rows
        for (let i = 1; i <= tempCols; i++) {
            if (streamObjs.length <= i * tempCols) {
                tempRows = i;
                break;
            }
        }

        // if temp and state not equal update state to rerender
        if (cols !== tempCols || rows !== tempRows) {
            setCols(tempCols);
            setRows(tempRows);

            // calculate if orientation should change
            let rect = streamGrid.current.getBoundingClientRect();
            let width = rect.width / 4;
            let height = rect.height / 3;

            let portrait = width < height;
            setOrientation(portrait ? "portrait" : "landscape");

            // check if should crop streams
            if ((!portrait && (rect.width / tempCols) < (rect.height / tempRows))
                || (portrait && (rect.width / tempRows) < (rect.height / tempCols))) {
                setObjFit("cover");
            } else {
                setObjFit("contain");
            }
        }
    }, [streamObjs, cols, rows]);

    useEffect(() => {
        // resizing grid on window resize
        const resize = () => {
            // check if orientation should change
            let rect = streamGrid.current.getBoundingClientRect();
            let width = rect.width / 4;
            let height = rect.height / 3;
            let portrait = width < height
            setOrientation(portrait ? "portrait" : "landscape");

            // check if should crop streams
            if ((!portrait && (rect.width / cols) < (rect.height / rows))
                || (portrait && (rect.width / rows) < (rect.height / cols))) {
                setObjFit("cover");
            } else {
                setObjFit("contain");
            }
        }

        // add event listener for resize
        window.addEventListener('resize', resize);

        // remove listener on unmount
        return () => window.removeEventListener('resize', resize);
    }, [cols, rows]);

    useEffect(() => {
        // set camera muted to camActive state
        connection.current.extra.muted = !camActive
    }, [camActive]);

    useEffect(() => {
        return () => {
            // on leaving room:
            // disconnect with all users
            connection.current.getAllParticipants().forEach(function (pid) {
                connection.current.disconnectWith(pid);
            });

            // stop all local cameras
            connection.current.attachStreams.forEach(function (localStream) {
                localStream.stop();
            });

            // close socket.io connection
            connection.current.closeSocket();
        };
    }, []);



    const screenShare = () => {
        const startScreenShare = () => {
            // request screen media from user
            window.navigator.mediaDevices.getDisplayMedia({ video: true }).then(stream => {
                // get video track
                let track = stream.getVideoTracks()[0];
                // set callback for track ended
                track.onended = stopScreenShare;
                // for each peer connected to client
                connection.current.peers.forEach(function (peer) {
                    peer.peer.getSenders().forEach(function (sender) {
                        // replace video track with screen share
                        if (sender.track.kind === 'video') {
                            sender.replaceTrack(track);
                        }
                    });
                });
                // update local view
                let localStream = streamObjs.find(obj => obj.id === connection.current.userid);
                let idx = streamObjs.indexOf(localStream);
                streamRefs.current[idx].srcObject = stream;
                setScreenActive(true); // update state
            }).catch(err => {
                console.log(err); // log error
                setScreenActive(false); // reset state
            });
        }

        const stopScreenShare = () => {
            // get local camera stream
            let localStream = streamObjs.find(obj => obj.id === connection.current.userid);
            // for each peer connected to client
            connection.current.peers.forEach(function (peer) {
                peer.peer.getSenders().forEach(function (sender) {
                    // stop screen track and replace with camera track
                    if (sender.track.kind === 'video') {
                        sender.replaceTrack(localStream.stream.getVideoTracks()[0]);
                        sender.track.stop();
                    }
                });
            });
            // update local view
            let idx = streamObjs.indexOf(localStream);
            streamRefs.current[idx].srcObject = localStream.stream;
            setScreenActive(false); // update state
        }

        // check if should start or stop screen share
        if (screenActive) {
            stopScreenShare();
        } else {
            startScreenShare();
        }
    }


    // get track of given "kind"
    const getLocalTrack = (kind) => {
        if (kind === "video") return connection.current.attachStreams[0].getVideoTracks();
        else if (kind === "audio") return connection.current.attachStreams[0].getAudioTracks();
    }

    return (
        <MainContainer>

            <VideoGrid ref={streamGrid}
                cols={orientation === "portrait" ? rows : cols}
                rows={orientation === "portrait" ? cols : rows}>
                {/* toolbar function props */}
                <Toolbar
                    toggleCam={() => {
                        setCamActive(!camActive);
                        let stream = connection.current.attachStreams[0]
                        getLocalTrack("video")[0].enabled ? stream.mute("video") : stream.unmute("video");
                    }}
                    toggleMic={() => {
                        setMicActive(!micActive);
                        let stream = connection.current.attachStreams[0]
                        getLocalTrack("audio")[0].enabled ? stream.mute("audio") : stream.unmute("audio");
                    }}
                    states={{
                        cam: camActive,
                        mic: micActive,
                        screen: screenActive
                    }}
                    toggleScreen={screenShare}
                    toggleChat={() => { setChatActive(!chatActive) }}
                    connection={connection.current} />

                {/* mapping streams into video containers */}
                {streamObjs.map(streamObj =>
                    <VideoContainer key={streamObj.id} fit={objFit}>
                        <span>{streamObj.name}</span>
                        {streamObj.video}
                    </VideoContainer>
                )}
            </VideoGrid>

            <ChatArea connection={connection.current} state={chatActive} />

        </MainContainer >
    )

}

