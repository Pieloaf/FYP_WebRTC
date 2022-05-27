import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import mixins from "../styles/mixins";
import theme from "../styles/theme";

// ewww this is very ugly nested styled component madness 🤮
const ChatContainer = styled.div`
    margin-left: auto;
    display: ${({ show }) => show ? "flex" : "none"};
    flex-direction: column;
    width: 450px;
    min-width: 200px;
    height: 100%;
    align-items: center;
    justify-content: flex-end;
    background-color: ${theme.colours.darkBlue};
    z-index: 2;
    position: relative;
    @media screen and (max-width: 960px) {
        position: absolute;
        left: 0;
        width: 100vw;
    }
    > div {
        padding-bottom: 10px;
        width: -webkit-fill-available;
        display: flex;
        > * {
            border-radius: 7px; 
            border: none;
            outline: none;
            : focus { 
                outline-style: solid;
                outline-width: 2px;
                outline-color: ${theme.colours.lightBlue};
            }
        }
        > input {
            margin: 10px;
            height: 32px;
            width: 100%;
        }

    }
`;

const CloseBtn = styled.h3`
        ${mixins.interactive}
        padding: 0 7px 2px;        
        border-radius: 5px;
        position: absolute;
        top: 0;
        left: 0;
        margin: 5px;
        : hover {
            background-color: ${theme.colours.pink};
            color: ${theme.colours.white};
        }
`

const MessageBox = styled.span`
    text-align: left;
    width: -webkit-fill-available;
    word-break: break-word;
    padding: 10px;
    margin: 10px 10px 0;
    border-radius: 7px;
    background-color: ${theme.colours.lightBlue};
    color: ${theme.colours.white};
    font-size: ${theme.fontSizes.md};
`;

const SendBtn = styled.button`
    ${mixins.interactive}
    margin: 10px;
    margin-left: auto;
    background-color: ${theme.colours.teal};
`;

export const ChatArea = ({ connection, state }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [chatActive, setChatActive] = useState(false);
    const msgInput = useRef();

    // set initial chat state
    useEffect(() => {
        setChatActive(state);
    }, [state]);

    connection.onmessage = (event) => {
        // update message array on new message
        setMessages((msgs, i) => [...msgs, <MessageBox key={i}>
            {event.data.author}: {event.data.content}
        </MessageBox>
        ]);
    }

    useEffect(() => {
        if (!connection.socket) return;
        // send message on start recording event from server
        connection.socket.on("recording-status", function (message) {
            setMessages((msgs, i) => [...msgs, <MessageBox key={i}>
                {message}
            </MessageBox>
            ]);
        });
    }, [connection.socket]);

    const sendMessage = () => {
        if (!message) return // return if empty message
        // send message content and author on RTCDataChannel
        connection.send({ content: message, author: connection.extra.name });
        // update messages array with personal message
        setMessages((msgs, i) => [...msgs,
        <MessageBox key={i}>
            You: {message}
        </MessageBox>
        ]);
        // reset message input
        msgInput.current.value = '';
    }

    return (
        <ChatContainer show={chatActive} >
            <CloseBtn onClick={() => setChatActive(false)}>X</CloseBtn>
            {messages}
            <div>
                <input type="text"
                    placeholder="Message..."
                    onChange={(e) => { setMessage(e.target.value) }}
                    ref={msgInput} />
                <SendBtn onClick={sendMessage}>Send</SendBtn>
            </div>
        </ChatContainer>
    )

}