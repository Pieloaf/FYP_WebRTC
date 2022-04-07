import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Toolbar } from "../components/toolbar";
import { useLocation } from "react-router-dom";
import mixins from "../styles/mixins";
import theme from "../styles/theme";

const MainContainer = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    background-color: ${theme.colours.black};
`;

const ChatContainer = styled.div`
    margin-left: auto;
    display: flex;
    flex-direction: column;
    width: 350px;
    min-width: 200px;
    height: 100%;
    background-color: ${theme.colours.darkBlue};
`;

const VideoGrid = styled.div`
    display: grid;
    grid-gap: 10px;
    ${mixins.fill};
    grid-template-columns: ${props => '1fr '.repeat(props.cols)};
    grid-template-rows: ${props => '1fr '.repeat(props.rows)};
    place-items: center;
    > div {
        display: flex;
        width: 100%;
        height: 100%;
    }
`;

const VideoContainer = styled.div`
    display: flex;
    object-fit: ${props => props.fill ? 'fill' : 'contain'};
    width: 100%;
`;

const messageBox = styled.div`
    float: left;
    width: fill - available;
    word -break: break-all;
    padding: 10px;
    margin: 10px 10px 0;
    border - radius: 7px;
    background - color: ${theme.colours.lightBlue};
    color: ${theme.colours.white};
    font - size: ${theme.fontSizes.md};
`;

export const Room = () => {

    const [messages, setMessages] = useState([]);
    const [chatOpen, setChatOpen] = useState(false);
    const [camera, setCamera] = useState(null);
    const [mic, setMic] = useState(null);
    const [cols, setCols] = useState(1);
    const [rows, setRows] = useState(1);
    const [fill, setFill] = useState(false);
    const [streams, setStreams] = useState([]);
    const roomID = useLocation().pathname.split('/room/')[1];

    const streamGrid = useRef();
    const connection = useRef(new window.RTCMultiConnection());

    useEffect(() => {
        try {
            let roomData = JSON.parse(sessionStorage.getItem(roomID));
            connection.current.extra.name = roomData.name;
        } catch (e) {
            let name = prompt('Please enter your name', 'Guest');
            connection.current.extra.name = name;
            sessionStorage.setItem(roomID, JSON.stringify({ "name": name }));
        }

        connection.current.session = {
            data: true,
            video: true,
            audio: true
        };
        connection.current.enableFileSharing = true;

        connection.current.socketURL = "https://192.168.1.105:9001/";
        connection.current.openOrJoin(roomID);
        //     connection.current.onleave = (event) => {
        //         setStreams(streams.filter((stream) => stream.userid !== event.userid));
        //         resizeGrid();
        //     };
        //     connection.current.onmessage = (event) => {
        //         createMessage(event.extra.name, event.data);
        //     };
        //     connection.current.onopen = (event) => {
        //         createMessage("System", `${event.extra.name} has joined to the room`);
        //     };
        //     connection.current.onleave = (event) => {
        //         createMessage("System", `${event.extra.name} has left the room`);
        //     };
        //     window.addEventListener("resize", resizeGrid);
    }, [roomID]);

    useEffect(() => {
        const createMessage = (user, message) => {
            let msgObj = {
                user: user,
                message: message,
            }
            setMessages(messages => [...messages, msgObj]);
        };

        connection.current.onstream = (event) => {
            setStreams(streams => [...streams, event]);
            // resizeGrid();
        };
    }, []);

    useEffect(() => {
        let userIDs = []
        streams.forEach((stream) => {
            if (userIDs.find((id) => id === stream.userid)) {
                return
            } else {
                userIDs.push(stream.userid);
                stream.mediaElement.style.objectFit = fill ? 'cover' : 'contain';
                streamGrid.current.appendChild(stream.mediaElement);
            }
        });

    }, [streams, fill]);

    useEffect(() => {

        const resizeGrid = () => {
            let tempCols = cols;
            let tempRows = rows;
            if (streams.length <= tempCols) {
                if (streams.length <= (tempCols - 1) ** 2) tempCols--;
            } else tempCols++;

            for (let i = 1; i <= tempCols; i++) {
                if (streams.length <= i * tempCols) {
                    tempRows = i;
                    break;
                }
            }
            setFill(streamGrid.current.clientWidth < streamGrid.current.clientHeight);

            setCols(tempCols);
            setRows(tempRows);
        };

        resizeGrid();
    }, [streams]);
    // window.addEventListener("resize", resizeGrid);

    const displayMessages = () => {
        return messages.map((message, index) => {
            <messageBox key={index}>
                {message.user}: {message.message}
            </messageBox>
        });
    };

    return (
        <MainContainer>
            <Toolbar
                toggleChat={() => setChatOpen(!chatOpen)}
                toggleCam={() => { console.log("toggle cam") }}
                toggleMic={() => { console.log("toggle mic") }}
                record={() => { console.log("record") }}
            />
            <VideoGrid
                ref={streamGrid}
                cols={fill ? rows : cols}
                rows={fill ? cols : rows}
            >
            </VideoGrid>
            <ChatContainer>
                {displayMessages()}
                <div>
                    <input type="text" />
                    <button>Send</button>
                </div>
            </ChatContainer>
        </MainContainer>
    )


}
