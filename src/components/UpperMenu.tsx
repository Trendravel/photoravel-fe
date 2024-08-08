import styled from "@emotion/styled";
import { useState } from "react";

import SideMenu from "./SideMenu";
import LogoImage from "../assets/Photoravel_Logo(Demo).png";

const UpperMenu = () => {
    
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen((prev) => {
            console.log("현재 상태:", prev); // 현재 상태 로그
            return !prev; // 상태 토글
        });
    };

    return (
        <>
        <Container>
            <Logo src={LogoImage}/>
            <HamburgerMenu onClick={toggleMenu}>
                <HamburgerMenuBar isOpen={isOpen}/>
                <HamburgerMenuBar isOpen={isOpen}/>
                <HamburgerMenuBar isOpen={isOpen}/>
            </HamburgerMenu>
            
        </Container>
        <SideMenu isOpen={isOpen} toggleMenu={toggleMenu}/>
        </>
    )
}

const HamburgerMenu = styled.button`
    position: relative;
    margin-right: 1em;
    padding: 1em;
    border-radius: 0.5em;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    display: grid;
    justify-items: center;
    gap: 0.5em;
    border: none;
    cursor: pointer;
`;

const Container = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 9vh;
    z-index: 10;
    top: 0;
    background-color: white;
`;

const Logo = styled.img`
    width: 3.5em;
    height: 3.5em;
    margin-left: 0.75em;
`;


const HamburgerMenuBar = styled.span<{isOpen: boolean}>`
    height: 0.3em;
    width: 2.25em;
    border-radius: 2em;
    background-color: black;

    transition: all 0.3s ease;

    &:nth-of-type(1) {
        transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg) translateY(0.6em) translateX(0.6em) scaleX(1.4)' : 'rotate(0) translateY(0)')};
    }

    &:nth-of-type(2) {
        opacity: ${({ isOpen }) => (isOpen ? '0' : '1')};
    }

    &:nth-of-type(3) {
        transform: ${({ isOpen }) => (isOpen ? 'rotate(-45deg) translateY(-0.5em) translateX(0.5em) scaleX(1.4)' : 'rotate(0) translateY(0)')};
    }
`;

export default UpperMenu;