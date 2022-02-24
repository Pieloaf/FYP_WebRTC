import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";

const StyledVideoContainer = styled.div`
        
        height: fit-content;
        background-color: red;
        border: 1px solid #06d6a0;
        
        @media screen and (max-width: ${theme.breakpoints.tablet}) {
            width: 100%;
        }
        width: -webkit-fill-available;
        > video {
            width: -webkit-fill-available;
        }
`;

export const VideoContainer = (props) => {

    return (<>
        {[props.src]}
    </>);

}