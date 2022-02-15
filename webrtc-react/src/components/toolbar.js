import React from "react";
import { FaShare, FaCamera, FaMicrophone, FaPhone, FaFacebookMessenger } from "react-icons/fa";
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

const toggleChat = () => {

}
export const Toolbar = () => {
    return (
        <ToolbarContainer>
            <StyledToolbar >
                <ul>
                    <ToolbarItem>
                        <FaShare />
                    </ToolbarItem>
                    <ToolbarItem>
                        <FaCamera />
                    </ToolbarItem>
                    <ToolbarItem>
                        <FaMicrophone />
                    </ToolbarItem>
                    <ToolbarItem onClick={toggleChat}>
                        <FaFacebookMessenger />
                    </ToolbarItem>
                    <ToolbarItem color={theme.colours.pink}>
                        <FaPhone />
                    </ToolbarItem>
                </ul>
            </StyledToolbar>
        </ToolbarContainer>
    )
}