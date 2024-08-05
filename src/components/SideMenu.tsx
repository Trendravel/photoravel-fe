import styled from "@emotion/styled";
import { useState } from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
    isOpen: boolean;
    toggleMenu: () => void;
  }

const Background = styled.div<{ isOpen: boolean }>`
    position: ${(props) => (props.isOpen ? 'absolute':'relative')};
    z-index: 30;
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
    z-index: 40;
    top: 0;
    right: 0;
    width: 65vw;
    height: 100%;
    background-color: white;
`;

const Option = styled.a`
    display: block;
    margin: 1em 0 1em 0;
    font-size: 12pt;
    font-weight: 500;
`;

const CancelButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    padding: 1em;
    border-radius: 0.5em;
    font-size: 1.5em;
`;


const UserContainer = styled.div`
    display: flex;
    margin: 2em 0 1em 0;
    justify-content: center;
    align-items: center;
`;

const UserImage = styled.img`
    width: 2em;
    height: 2em;
    margin: 0 0.5em 0 0.5em;
`;

const SideMenu: React.FC<SidebarProps> = ({isOpen, toggleMenu}) => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [username, setUsername] = useState("User");

    return (
        <>
        <Container isOpen={isOpen}>
            <CancelButton
                onClick={toggleMenu}
            >
                X
            </CancelButton>
            <UserContainer>
            {
                isLoggedIn?
                <>
                <UserImage
                    src="https://friconix.com/png/fi-cnsuxl-user-circle.png"
                />
                <Option>반가워요, {username} 님!</Option>
                </>:
                <Option>
                    <Link
                    to="/login"
                    style={{
                        color: "black",
                        textDecoration: "none !important",
                        textDecorationLine: "none"
                    }}>
                        로그인 / 회원가입
                    </Link>
                </Option>
            }
            </UserContainer>
            <Option>장소 등록</Option>
            <Option>가이드북</Option>
            <Option>가이드 찾기</Option>
            
        </Container>
        <Background isOpen={isOpen}/>
        </>
    )
}

export default SideMenu;