import styled from "@emotion/styled";
import axios from "axios";
import { useState } from "react";

import { CenterContainer, FormContainer, SubmitButton, TextInput } from "./AddInfo.page";
import Logo from "../assets/Photoravel_LoginPage_Logo.png"

const PageContainer = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
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

const LocalLogin = () => {
    const BACKEND_ADDRESS = import.meta.env.VITE_BACKEND_API_ADDRESS;
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(BACKEND_ADDRESS+`/public/photographers/login`, {
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
            <CenterContainer width="80vw" height="19em">
                <LogoImage src={Logo}/>
                <Title>사진작가님, 환영합니다!</Title>
                <form onSubmit={handleSubmit}>
                    <FormContainer margin="1em auto">
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
                    </FormContainer>
                    <SubmitButton type="submit">
                        로그인
                    </SubmitButton>
                </form>
            </CenterContainer>
        </PageContainer>
    );
};

export default LocalLogin;
