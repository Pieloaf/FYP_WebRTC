import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";

const VideoContainer = styled.div`
    width: 640px;
    height: 480px;
    background-color: red;
    border: 1px solid #06d6a0;
    
    @media screen and (max-width: ${theme.breakpoints.tablet}) {
        width: 100%;
    }
`;

export const StreamContainer = () => {

    return (
        <VideoContainer>
        </VideoContainer>
    )

}