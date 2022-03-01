import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { NavBar } from "../components/Navbar";
import mixins from "../styles/mixins";
import theme from "../styles/theme";

const LandingContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #5854f8;
    color: #F0EFF4;
    > div {
        display: flex;
        align-items: center;
        width: 100%;
    }
`;

const Body = styled.div`
    flex-direction: column;
    justify-content: center;
    , a{
        text-decoration: none;
    }
`;

const MidContainer = styled.div`
    min-height: 600px;
    height: 80vh;
    ${mixins.fill};
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Title = styled.span`
    display: flex;
    
    padding: 2rem;
    ${mixins.fill};
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    font-size: ${theme.fontSizes.title};
    font-weight: bold;
    text-align: left;
    text-decoration: underline;

    @media screen and (max-width: 499px) {
        font-size: 42px;
    }
    `;

const Features = styled.div`
    background-color: #1b1a5d;
    height: 100%;
    ${mixins.fill};
    > ul {
        padding: 30px 10px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
        @media screen and (max-width: 499px) {
            flex-direction: column;
            align-items: center;
        }
        > li {
            margin: 16px
            width: 128px;
            height: 128px;
            background-color: ${theme.colours.white};
            border-radius: 50%;
            font-size: ${theme.fontSizes.md};
            color: ${theme.colours.darkBlue};
        }
    }
`;


const StyledButton = styled.span`
    ${mixins.flexCentre}
    ${mixins.interactive}
    padding: 0.5rem 1.5rem;
    transition: box-shadow 0.3s ease-in;
    :hover{
        box-shadow: 0px 0px 6px 1px #1b1a5d;
    }
`
const StyledInput = styled.input`
    ${mixins.flexCentre}
    ${mixins.interactive}
    justify-content: center;
    align-items: center;
    padding: 0.5rem 2rem;
    border: none;
`;

const Footer = styled.div`
    ${mixins.flexCentre}
    padding: 32px 0;
    font-size: ${theme.fontSizes.sm};
    background-color: ${theme.colours.black};
    color: ${theme.colours.white};
    ${mixins.fill};
}`;

export const HomePage = () => {
    const [Name, setName] = useState("");
    const [roomID, setRoomID] = useState("");

    const updateRoomID = (e) => {
        setRoomID(e.target.value);
    }

    const getRoomID = (e) => {
        if (!roomID.length) {
            //random room id
            setRoomID(Math.random().toString(36).substring(2));
        }
        return roomID;
    }

    return (
        <LandingContainer>
            <NavBar />
            <Body>
                <MidContainer>
                    <Title>Video Conferencing</Title>
                    <StyledInput placeholder="Name" width="300px" />
                    <StyledInput placeholder="Room ID" width="400px" onChange={updateRoomID} />
                    <StyledButton bgColor={theme.colours.teal}>
                        <Link to={`/room/${getRoomID()}`}
                            state={{
                                name: Name,
                                roomID: getRoomID()
                            }}>
                            Join room
                        </Link>
                    </StyledButton>
                </MidContainer>
                <Features>
                    <h1> Features </h1>
                    <ul>
                        <li>Live Video Chat</li>
                        <li>Peer to Peer Connection</li>
                        <li>Beep Boop</li>
                    </ul>
                </Features>
            </Body>
            <Footer> Pierce Lowe - DT021A - Final Year Project - 2022</Footer>
        </LandingContainer >
    );

}