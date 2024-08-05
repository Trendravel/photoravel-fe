import styled from "@emotion/styled";
import { useState } from "react";

import SideMenu from "./SideMenu";

const UpperMenu = () => {
    
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen((prev) => {
            console.log("현재 상태:", prev); // 현재 상태 로그
            return !prev; // 상태 토글
        });
    };

    return (
        <Container>
            <HamburgerMenu onClick={toggleMenu}>
                <HamburgerMenuBar isOpen={isOpen}/>
                <HamburgerMenuBar isOpen={isOpen}/>
                <HamburgerMenuBar isOpen={isOpen}/>
            </HamburgerMenu>
            <SideMenu isOpen={isOpen} toggleMenu={toggleMenu}/>
        </Container>
    )
}

const HamburgerMenu = styled.button`
    position: absolute;
    z-index: 10;
    top: 2em;
    right: 1em;
    padding: 1em;
    border-radius: 0.5em;
    background-color: #ff808a;
    box-shadow: 3px 4px 1px rgba(0, 0, 0, 0.15);
    display: grid;
    justify-items: center;
    gap: 0.5em;
    border: none;
    cursor: pointer;
`;

const Container = styled.div`
`;

const HamburgerMenuBar = styled.span<{isOpen: boolean}>`
    height: 0.3em;
    width: 2.25em;
    border-radius: 2em;
    background-color: white;

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