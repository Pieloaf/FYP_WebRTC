import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const StyledChatArea = styled.div`

    margin-left:auto;
    display: none;
    flex-direction: column;
    width: 400px;
    min-width: 200px;
    height: 100%;
    background-color: ${theme.colours.darkBlue};
    @media screen and (max-width: ${theme.breakpoints.mobile}) {
        position: absolute;
        left: 0;
        width: 100vw;
    }
    &.active {
        display: flex;
    };
`;

const StyledInput = styled.input`
    width: 100%;
    height: 50px;
    border: none;
    border-radius: 5px;
    padding: 0 10px;
    font-size: ${theme.fontSizes.md};
    color: ${theme.colours.white};
    background-color: ${theme.colours.darkBlue};
    &:focus {
        outline: none;
    }
`;


export const ChatArea = ({ visible, messages, sendMessage }) => {
    const [input, setInput] = useState('');
    const inputRef = useRef();
    const messagesRef = useRef();
    const scrollToBottom = () => {

        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(input);
        setInput('');
    };

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    return (
        <StyledChatArea className={visible ? 'active' : ''}>
            <div className="messages" ref={messagesRef}>
                {messages.map((message, i) => (
                    <div key={i}>
                        <span>{message.user}:</span>
                        <span>{message.text}</span>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <StyledInput
                    ref={inputRef}
                    value={input}
                    onChange={handleChange}
                    placeholder="Type a message..."
                />
            </form>
        </StyledChatArea>
    );


    // return(
    //     <StyledChatArea className = "active" >
    //         <div>
    //         </div>
    //         <StyledInput />
    //     </StyledChatArea >
    // )
}