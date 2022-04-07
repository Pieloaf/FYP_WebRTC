import React from "react";
import { FaShare, FaCamera, FaMicrophone, FaPhone, FaFacebookMessenger, FaCircle } from "react-icons/fa";
import styled from "styled-components";
import theme from "../styles/theme";
import mixins from "../styles/mixins";

const StyledToolbar = styled.div`
    background-color: ${theme.colours.darkBlue};
    border-radius: 32px;
    width: fit-content;
    padding: 0 12px;
    transition: ${theme.transition};
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
    border-radius : ${theme.borderRadii.slight};
    background-color: ${({ color }) => color ? color : theme.colours.white};
    padding: 8px;
    margin: 8px;
    color: ${theme.colours.black};
    transition: transform 0.1s ease-in-out;
    :hover {
        cursor: pointer;
        transform: scale(1.1);
        box-shadow: 0px 0px 3px 1px ${theme.colours.black};
    }
`;

export const Toolbar = (props) => {
    return (
        <ToolbarContainer>
            <StyledToolbar >
                <ul>
                    <ToolbarItem onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                    }}>
                        <FaShare />
                    </ToolbarItem>
                    <ToolbarItem onClick={props.toggleCam}>
                        <FaCamera />
                    </ToolbarItem>
                    <ToolbarItem onClick={props.toggleMic} >
                        <FaMicrophone />
                    </ToolbarItem>
                    <ToolbarItem onClick={props.toggleChat}>
                        <FaFacebookMessenger />
                    </ToolbarItem>
                    <ToolbarItem onClick={props.record}>
                        <FaCircle />
                    </ToolbarItem>
                    <ToolbarItem color={theme.colours.pink} onClick={props.leaveCall}>
                        <FaPhone />
                    </ToolbarItem>
                </ul>
            </StyledToolbar>
        </ToolbarContainer>
    )
}