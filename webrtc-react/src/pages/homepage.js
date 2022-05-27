import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { NavBar } from "../components/Navbar";
import mixins from "../styles/mixins";
import theme from "../styles/theme";

// Styled Components used in the Landing Page
const LandingContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #5854f8;
    color: #F0EFF4;
    height: 100vh;
`;

const Body = styled.div`
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    , a{
        text-decoration: none;
    }
    height: 100vh;
    padding: 20px;
    display: flex;
`;

const Title = styled.span`
    padding: 2rem;
    flex-wrap: wrap;
    font-size: ${theme.fontSizes.title};
    font-weight: bold;
    text-align: left;
    text-decoration: underline;
    @media screen and (max-width: 499px) {
        font-size: 42px;
    }
`;

const StyledButton = styled.button`
    ${mixins.flexCentre}
    ${mixins.interactive}
    padding: 0.5rem 1.5rem;
    transition: ${theme.transition}
    border: none;
    :hover{
        cursor: pointer;
        box-shadow: 0px 0px 6px 1px #1b1a5d;
    }   
`;

const StyledInput = styled.input`
    ${mixins.flexCentre}
    ${mixins.interactive}
    : hover{
        transform: none;
        cursor: text;
    }
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
`;

export const HomePage = () => {
    // room stateful variables
    const [Name, setName] = useState("");
    const [roomID, setRoomID] = useState("");
    const navigate = useNavigate();

    // read room id from input
    const getRoomID = () => {
        let id;

        // store read room id, if no room id then generate a random id
        id = roomID.length ? roomID : Math.random().toString(36).substring(2)

        // if name entered store in session storage
        if (Name.length) {
            sessionStorage.setItem(id, JSON.stringify({
                "name": Name
            }));
        }
        // return room id
        return id;
    }

    const handleJoin = useCallback(() => {
        // redirect to room page passing name and id as props
        navigate(`/room/${getRoomID()}`);
    });


    return (
        <LandingContainer>
            <NavBar />
            <Body>
                <Title>Start a Meeting!</Title>
                <StyledInput
                    placeholder="Name"
                    width="250px" // override default width
                    onChange={(e) => setName(e.target.value)} />
                <StyledInput
                    placeholder="Room ID"
                    width="350px" // override default width
                    onChange={(e) => setRoomID(e.target.value)} />
                <StyledButton
                    bgColor={theme.colours.teal} // override background color
                    onClick={handleJoin}>Join Meeting</StyledButton>
            </Body>
            <Footer> Pierce Lowe - DT021A - Final Year Project - 2022</Footer>
        </LandingContainer >
    );

}