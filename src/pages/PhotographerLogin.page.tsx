import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FormContainer, TextInput } from "./AddInfo.page";
import { jsonConnection } from "../api/connectBackend";
import Logo from "../assets/Photoravel_LoginPage_Logo.png"
import { ApiResponse } from "../types/Common";
import { MemberResponse } from "../types/Login";

const PageContainer = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`;

const ColumnContainer = styled.div`
    display: flex;
    position: absolute;
    top: 20vh;
    width: 100vw;
    height: 50vh;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;

const Title = styled.p`
    text-align: center;
    font-size: 13pt;
    font-weight: 500;
    margin: 0 0 0.25em 0;
`;

const LogoImage = styled.img`
    width: 50vw;
`;

const FullContentContainer = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const LoginButton = styled.button<{width?: string}>`
    width: ${(props) => props.width? props.width: "100%"};
    height: 2.5em;
    background-color: #FF808A;
    border-radius: 1.25em;
    color: white;
    font-size: 13pt;
    font-weight: 600;
    box-shadow: 1px 1px 2px 1px #cccccc;
`;

const PhotographerLogin = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await jsonConnection.post<ApiResponse<MemberResponse>>(`/public/photographers/login`, {
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
        <PageContainer>
            <ColumnContainer>
                <FullContentContainer>
                    <LogoImage src={Logo}/>
                    <Title>사진작가님, 환영합니다!</Title>
                </FullContentContainer>
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
                </FormContainer>
                <p
                style={{color: "#aaaaaa"}}
                onClick={() => { navigate('/signup?for=photographer')}}    
                >
                    사진작가 등록하러 가기 &gt;
                </p>
            </ColumnContainer>
        </PageContainer>
    );
};

export default PhotographerLogin;
