import styled from "@emotion/styled";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { LoginButton } from "./PhotographerLogin.page";
import { jsonConnection } from "../api/connectBackend";
import { setOAuthLogin } from "../api/Login";
import { ApiResponse } from "../types/Common";
import { MemberResponse, NonMemberParam } from "../types/Login";

const PageContainer = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`;

export const CenterContainer = styled.div<{width: string, height: string, shadow?: boolean}>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    padding: 1em 2em 1em 2em;
    border-radius: 0.5em;
    box-shadow: ${(props) => props.shadow? "0px 0px 4px #d0d0d0":""};
    text-align: center;
`;

const TitleContainer = styled.div`
    width: fit-content;
`;

const Title = styled.p`
    width: fit-content;
    text-align: left;
    font-size: 16pt;
    font-weight: 500;
    margin: 0 0 0.25em 0;
`;

export const FormContainer = styled.form<{margin?: string, width?: string}>`
    display: flex;
    flex-direction: column;
    margin: ${(props) => props.margin ? props.margin : ""};
    gap: 1em;
    width: ${(props) => props.width};
`;

export const TextInput = styled.input<{fontSize?: string, margin?: string}>`
    width: 100%;
    font-size: ${(props) => props.fontSize ? props.fontSize : "14pt"};
    padding: 0.25em;
    margin: ${(props) => props.margin ? props.margin : ""};
    border-bottom: 1px solid #cccccc;
    transition: 0.25s border-bottom ease-in;

    &:focus {
        border-bottom: 1px solid #87DEBE;
    }
`;

export const SubmitButton = styled.button`
    color: white;
    background-color: #FF808A;
    font-size: 14pt;
    font-weight: 600;
    height: 2em;
    padding: 0.5em;
    border-radius: 0.5em;
    box-shadow: 1px 1px 3px 1px #cccccc;
`;

const AddInfo = () => {
    const { state } = useLocation();
    const userData:NonMemberParam = state;
    const navigate = useNavigate();

    const [id, setId] = useState("kakao_"+userData.id);
    const [name, setName] = useState(userData.nickname);
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState(userData.email);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await jsonConnection.post<ApiResponse<MemberResponse>>(`/login/addInfo`, {
                provider: "kakao",
                id: id,
                name: name,
                nickname: nickname,
                email: email,
                profileImg: userData.profileImg
            })
            .then((res) => {
                console.log(res);
                setOAuthLogin(res.data.data!, navigate);
                navigate('/');
            })
            .catch((e) => {
                alert("가입 중 에러가 발생했습니다. 다시 시도해주세요.");
                console.error(e);
            })
            
            // 성공적으로 전송된 후 처리할 로직 추가
        } catch (error) {
            console.error("Error sending data:", error);
            // 에러 처리 로직 추가
        }
    };

    return (
        <PageContainer>
            <CenterContainer width="90vw" height="20em">
                <TitleContainer>
                    <Title>📝 거의 다 됐어요,</Title>
                    <Title>추가 정보를 입력해주세요!</Title>
                </TitleContainer>
                <FormContainer width="100%" margin="1em auto" onSubmit={handleSubmit}>
                    <TextInput
                        type="text"
                        placeholder="아이디"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        disabled
                    />
                    <TextInput
                        type="text"
                        placeholder="이름"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextInput
                        type="text"
                        placeholder="닉네임"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <TextInput
                        type="text"
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <LoginButton type="submit">
                        가입하기
                    </LoginButton>
                </FormContainer>
                
            </CenterContainer>
        </PageContainer>
    );
};

export default AddInfo;
