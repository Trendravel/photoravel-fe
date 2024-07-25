import styled from "@emotion/styled";
import { useState } from "react";

const UpperMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Container>
            <HamburgerMenu onClick={toggleMenu}>
                <HamburgerMenuBar isOpen={isOpen}/>
                <HamburgerMenuBar isOpen={isOpen}/>
                <HamburgerMenuBar isOpen={isOpen}/>
            </HamburgerMenu>
            <Menu isOpen={isOpen}>
                <Option>장소 등록</Option>
                <Option>가이드북</Option>
                <Option>가이드 찾기</Option>
                <Option>로그인 | 회원가입</Option>
            </Menu>
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

const Menu = styled.div<{isOpen: boolean}>`
    transition: all 0.3s ease;
    opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
    transform: ${({ isOpen }) => (isOpen ? 'translateY(0.5em) translateX(-0.5em)' : '')};
    position: absolute;
    z-index: 9;
    top: 1em;
    right: 0.5px;
    padding: 3.5em 1.5em 1em 1.5em;
    background-color: white;
    border-radius: 1em;
`;

const Option = styled.a`
    display: block;
    margin: 0.5em 0 0.5em 0;
    font-size: 12pt;
    font-weight: 500;
`;

const HamburgerMenuBar = styled.span<{isOpen: boolean}>`
    height: 0.3em;
    width: 2.25em;
    border-radius: 2em;
    background-color: white;

    transition: all 0.3s ease;

    &:nth-of-type(1) {
        transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg) translateY(0.5em) translateX(0.5em) scaleX(1.2)' : 'rotate(0) translateY(0)')};
    }

    &:nth-of-type(2) {
        opacity: ${({ isOpen }) => (isOpen ? '0' : '1')};
    }

    &:nth-of-type(3) {
        transform: ${({ isOpen }) => (isOpen ? 'rotate(-45deg) translateY(-0.5em) translateX(0.5em) scaleX(1.2)' : 'rotate(0) translateY(0)')};
    }
`;

export default UpperMenu;