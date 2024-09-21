import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FormContainer, TextInput } from "./AddInfo.page";
import { LoginButton } from "./PhotographerLogin.page";
import { jsonConnection } from "../api/connectBackend";
import kakaoLoginImage from "../assets/free-icon-kakao-talk-4494622.png"
import LogoImage from "../assets/Photoravel_LoginPage_Logo.png";
import { ApiResponse } from "../types/Common";
import { MemberResponse } from "../types/Login";


const Login = () => { // 카카오 OAuth 로그인 및 회원가입 처리

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const REST_API_KEY = import.meta.env.VITE_KAKAO_OAUTH_RESTAPI_KEY;
    const REDIRECT_URI = import.meta.env.VITE_KAKAO_OAUTH_REDIRECT_URI;
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await jsonConnection.post<ApiResponse<MemberResponse>>(`/public/member/local`, {
                username: id,
                password: password
            });
            console.log("Response:", response.data);
            // 성공적으로 전송된 후 처리할 로직 추가
        } catch (error) {
            console.error("Error sending data:", error);
            // 에러 처리 로직 추가
        }
    };

    return (
        <Container>
            <ReturnButton
                onClick={() => {navigate('/')}}
            >
                &lt; 홈으로 돌아가기
            </ReturnButton>
            <Center>
                <LogoImageContainer src={LogoImage}/>
                <FormContainer
                onSubmit={handleSubmit}
                width="75%"
                margin="1em auto"
                >
                    <TextInput
                        type="text"
                        placeholder="아이디"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <TextInput
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <LoginButton type="submit">
                        로그인
                    </LoginButton>
                    <p
                    style={{
                        textAlign: "right",
                        fontSize: "10pt",
                        color: "#999999"
                    }}
                    onClick={() => navigate('/signup?for=user')}
                    >
                        회원가입 &gt;
                    </p>
                </FormContainer>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.25em"
                }}>
                    <KakaoButton
                        src={kakaoLoginImage}
                        onClick={() => {
                            window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
                        }}
                    />
                    <p
                    style={{
                        fontSize: "10pt",
                        fontWeight: "500"
                    }}
                    >
                        카카오계정으로 간편로그인
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

const KakaoButton = styled.img`
    height: 3em;
    margin-bottom: 0.5em;
    filter: drop-shadow(0.1em 0.1em 0.2em #BBBBBB);
`;

const Center = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2em;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 100vh;
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