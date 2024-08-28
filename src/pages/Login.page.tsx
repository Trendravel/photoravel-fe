import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import kakaoLoginImage from "../assets/kakao_login_medium_narrow.png"
import LogoImage from "../assets/Photoravel_LoginPage_Logo.png";

const Login = () => { // 카카오 OAuth 로그인 및 회원가입 처리

    const navigate = useNavigate();
    const REST_API_KEY = import.meta.env.VITE_KAKAO_OAUTH_RESTAPI_KEY;
    const REDIRECT_URI = import.meta.env.VITE_KAKAO_OAUTH_REDIRECT_URI;

    return (
        <Container>
            <ReturnButton
                onClick={() => {navigate('/')}}
            >
                &lt; 홈으로 돌아가기
            </ReturnButton>
            <Center>
                <LogoImageContainer src={LogoImage}/>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <LoginButton
                        src={kakaoLoginImage}
                        onClick={() => {window.open(`https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`)}}
                    />
                    <p
                    style={{
                        fontSize: "10pt",
                        color: "#999999"
                    }}
                    >
                        * 신규회원도 로그인 시 회원가입으로 이동합니다
                    </p>
                </div>
            </Center>
        </Container>
    )
}

const Container = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`;

const LogoImageContainer = styled.img`

`;

const LoginButton = styled.img`
    height: 3em;
    margin-bottom: 0.5em;
    filter: drop-shadow(0.1em 0.1em 0.2em #BBBBBB);
`;

const Center = styled.div`
    display: grid;
    align-items: center;
    grid-auto-flow: row;
    justify-content: space-evenly;
    position: relative;
    height: 100%;
`;

const ReturnButton = styled.button`
    position: absolute;
    border-radius: 1em;
    color: white;
    font-weight: 600;
    font-size: 12pt;
    top: 3em;
    left: 1em;
    z-index: 1;
    padding: 0.5em 1em 0.5em 1em;
    background-color: #FF808A;
    filter: drop-shadow(0.1em 0.1em 0.2em #BBBBBB);
`;

export default Login;