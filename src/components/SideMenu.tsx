import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { doLogout } from "../api/Login";
import { getCookie } from "../api/useCookie";

interface SidebarProps {
    isOpen: boolean;
    toggleMenu: () => void;
  }

const Background = styled.div<{ isOpen: boolean }>`
    position: ${(props) => (props.isOpen ? 'absolute':'none')};
    z-index: 15;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.1;
`;

const Container = styled.div<{ isOpen: boolean }>`
    transform: translateX(${(props) => (props.isOpen ? '0' : '100%')});
    transition: transform 0.5s ease;
    position: absolute;
    z-index: 25;
    top: 0;
    right: 0;
    width: 65vw;
    height: 100%;
    background-color: white;
`;

const Option = styled(Link)`
    display: block;
    color: black;
    margin: 1em 0 1em 0;
    font-size: 12pt;
    font-weight: 500;
    text-align: center;
    text-decoration: none;
    text-decoration-line: none;
`;

const Text = styled.p`
    margin: 1em 0 1em 0;
    font-size: 12pt;
    font-weight: 500;
`;


const CancelButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.75em;
    border-radius: 0.5em;
    font-size: 1.5em;
`;


const UserContainer = styled.div`
    display: flex;
    margin: 3.5em 0 1em 0;
    justify-content: center;
    align-items: center;
`;

const UserImage = styled.img`
    width: 2em;
    height: 2em;
    margin: 0 0.5em 0 0.5em;
`;

const BottomRightText = styled.p`
    position: absolute;
    bottom: 1em;
    right: 1em;
    color: #d0d0d0;
    font-size: 11pt;
`;

const SideMenu: React.FC<SidebarProps> = ({isOpen, toggleMenu}) => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [username, setUsername] = useState("");

    useEffect(() => {
        const name = getCookie("name")
        if (name) {
            setIsLoggedIn(true);
            if (getCookie("role") === "photographer")
                setUsername(name + " 작가");
            else
                setUsername(getCookie("nickname"));
        } else {
            setIsLoggedIn(false);
            setUsername("");
        }
        
    }, [isOpen, isLoggedIn])

    return (
        <>
        <Container isOpen={isOpen}>
            <CancelButton
                onClick={toggleMenu}
            >
                X
            </CancelButton>
            <UserContainer>
                <UserImage
                    src="https://friconix.com/png/fi-cnsuxl-user-circle.png"
                />

            {
                isLoggedIn?
                <Text>반가워요, {username}님!</Text>:
                <Option
                to="/login"
                style={{
                    color: "black",
                    textDecoration: "none !important",
                    textDecorationLine: "none"
                }}>
                    로그인하기 &gt;
                </Option>
            }
            </UserContainer>
            <Option to="/addplace">장소 등록</Option>
            <Option to="/guidebooklist">가이드북</Option>
            <Option to="/photographerlist">사진작가 찾기</Option>
            {
                isLoggedIn && getCookie("role") === "photographer" &&
                <Option to="/editprofile">프로필 수정</Option>
            }
            {
                isLoggedIn && 
                <BottomRightText
                    onClick={() => {
                        doLogout();
                        setIsLoggedIn(false);
                    }}
                >
                    로그아웃
                </BottomRightText>

            }
            </Container>
        <Background isOpen={isOpen} onClick={toggleMenu}/>
        </>
    )
}

export default SideMenu;
