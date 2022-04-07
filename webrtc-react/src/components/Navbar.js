import React, { useEffect, useRef, useState } from "react";
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
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 150) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return (
        <NavDiv ref={navRef} className={scrolled ? "scrolled" : ""}>
            <h1>Video Conferencing</h1>
        </NavDiv>
    )
}