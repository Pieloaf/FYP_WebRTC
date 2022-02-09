import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const NavDiv = styled.div`
    position: fixed;
    top: 0;
    width: 100vw;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    color: #F0EFF4;
    transition: background-color 0.3s ease-out;
    &.scrolled {
        background-color: #1b1a5d;
    }
`;

export const NavBar = () => {

    const navRef = useRef(null);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 150) {
                navRef.current.classList.add("scrolled");
            } else {
                navRef.current.classList.remove("scrolled");
            }
        })
    }, []);

    return (
        <NavDiv ref={navRef}>
            <h1>NavBar</h1>
        </NavDiv>
    )
}