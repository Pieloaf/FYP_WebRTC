import React, { useEffect, useState } from "react";
import { FaShare, FaCamera, FaMicrophone, FaPhone, FaFacebookMessenger, FaCircle } from "react-icons/fa";
import { MdScreenShare } from "react-icons/md";
import styled from "styled-components";
import theme from "../styles/theme";
import mixins from "../styles/mixins";
import { useNavigate } from "react-router-dom";

const StyledToolbar = styled.div`
    background-color: ${theme.colours.darkBlue};
    border-radius: 32px;
    width: fit-content;
    padding: 0 16px;
    transition: ${theme.transition};
    box-shadow: 0 0 9px 0px #ffffff78;
    ul {
        ${mixins.flexCentre};
        flex-direction: row;
    }
`;

const ToolbarContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    position: fixed;
    z-index: 1;
    padding-bottom: 24px;
    bottom: 0;
    ${StyledToolbar} {
        transform: translateY(200%);
    }
    &:hover ${StyledToolbar} {
        transform: translateY(0);
    }
`;


const ToolbarItem = styled.li`
    ${mixins.flexCentre};
    ${mixins.interactive}
    padding: 8px;
    margin: 8px;
   
    transition: transform 0.1s ease-in-out;
    :hover {
        box-shadow: 0px 0px 3px 1px ${theme.colours.black};
    }
`;

export const Toolbar = ({ connection, toggleCam, toggleMic, states, toggleChat, toggleScreen }) => {

    // stateful variables
    const [recording, setRecording] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();

    const toggleRecording = async () => {
        let msg;
        const startRecording = async () => {
            // request user screen media
            window.navigator.mediaDevices.getDisplayMedia({ video: true }).
                then(function (stream) {
                    // for each remote and local stream get the audio track
                    connection.streamEvents.selectAll().forEach((streamEvt) => {
                        // add the audio track to the stream for recording
                        stream.addTrack(streamEvt.stream.getAudioTracks()[0]);
                    });

                    // init recorder object and start recording
                    let recorder = window.RecordRTC(stream, {
                        type: 'video',
                        mimeType: 'video/mp4',
                    });
                    setRecording([recorder, stream]);
                    recorder.startRecording();

                    // if the user stops streaming through a browser interaction
                    stream.getVideoTracks()[0].onended = function (e) {
                        // call end recording function
                        endRecording(recorder, stream);
                    }
                    // notify peers recording has started
                    msg = `System: ${connection.extra.name} has started recording`
                    connection.socket.emit("recording-status", msg);

                }).catch(function (error) {
                    // log error
                    console.log(error);
                });
        };

        const endRecording = (recorder = null, stream = null) => {
            // if recorder and stream are not passed, read from state
            if (!recorder && !stream) {
                recorder = recording[0];
                stream = recording[1];
            }
            // stop recording
            recorder.stopRecording(function () {
                // create blob from recorded data
                let blob = recorder.getBlob();
                // create file from blob and open user file dialog to save
                window.invokeSaveAsDialog(blob, connection.sessionid + '.mp4');
            });

            // only stop video tracks
            // stopping audio tracks stops them in the call as well
            stream.getVideoTracks()[0].stop();
            // reset state
            setRecording(null);
            // notify peers recording has ended
            msg = `System: ${connection.extra.name} has stopped recording`
            connection.socket.emit("recording-status", msg);
        }

        // depending on state, start or end recording
        !recording ? startRecording() : endRecording();
    };

    // https://abdessalam.dev/blog/detect-device-type-javascript/
    // check if device is mobile on mount
    useEffect(() => {
        // get user agent
        const ua = navigator.userAgent;

        // parse with regex for device type
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            setIsMobile(true);
        }
        else if (
            /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
                ua
            )
        ) {
            setIsMobile(true);
        }
    }, []);

    return (
        <ToolbarContainer>
            <StyledToolbar >
                <ul>
                    <ToolbarItem onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                    }}>
                        <FaShare />
                    </ToolbarItem>
                    <ToolbarItem onClick={toggleCam} color={states.cam ? theme.colours.darkBlue : theme.colours.pink}>
                        <FaCamera />
                    </ToolbarItem>
                    <ToolbarItem onClick={toggleMic} color={states.mic ? theme.colours.darkBlue : theme.colours.pink}>
                        <FaMicrophone />
                    </ToolbarItem>
                    <ToolbarItem onClick={toggleChat}>
                        <FaFacebookMessenger />
                    </ToolbarItem>
                    {(() => {
                        if (!isMobile) {
                            return (<>
                                <ToolbarItem onClick={toggleScreen} color={states.screen ? theme.colours.pink : theme.colours.darkBlue}>
                                    <MdScreenShare />
                                </ToolbarItem>
                                <ToolbarItem onClick={toggleRecording} color={recording ? theme.colours.pink : theme.colours.darkBlue}>
                                    <FaCircle />
                                </ToolbarItem>
                            </>)
                        }
                    })()}
                    <ToolbarItem color={theme.colours.pink} onClick={() => { navigate("/"); }}>
                        <FaPhone />
                    </ToolbarItem>
                </ul>
            </StyledToolbar>
        </ToolbarContainer >
    )
}