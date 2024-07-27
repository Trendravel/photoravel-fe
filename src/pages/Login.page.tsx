import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import kakaoLoginImage from "../assets/kakao_login_medium_narrow.png"
import BackgroundImage from "../assets/nature-6799071_1920.jpg";

const Login = () => { // 카카오 OAuth 로그인 및 회원가입 처리

    const navigate = useNavigate();

    return (
        <Background>
            <ReturnButton
            onClick={() => {navigate('/')}}
            >
                &lt; 홈으로 돌아가기
            </ReturnButton>
            <LoginContainer>
                <Title>
                    <Icon src="https://cdn-icons-png.flaticon.com/512/3669/3669973.png"/>
                    카카오 로그인으로<br/>
                    간편하게 포토래블 이용하기!
                </Title>
                <Center>
                    <div>
                        <LoginButton src={kakaoLoginImage}/>
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
            </LoginContainer>
        </Background>
    )
}

const Background = styled.div`
    position: absolute;
    background-image: url(${BackgroundImage});
    background-position: right 35% top 10%;
    width: 100vw;
    height: 100vh;
`;

const LoginContainer = styled.div`
    position: absolute;
    width: 70%;
    height: 50%;
    padding: 1em;
    background-color: white;
    box-shadow: 0 0 0.5em #F5F5F5;
    text-align: center;
    border-radius: 0.5em;
    margin: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Icon = styled.img`
    padding: 0 0.25em 0 0;
    width: 1em;
`;

const Title = styled.p`
    padding: 0 0 0 0.75em;
    text-align: left;
    font-weight: 600;
    font-size: 17pt;
`;

const LoginButton = styled.img`
    margin-bottom: 0.5em;
    filter: drop-shadow(0.1em 0.1em 0.2em #BBBBBB);
`;

const Center = styled.div`
    display: grid;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 80%;
`;

const ReturnButton = styled.button`
    position: absolute;
    border-radius: 1em;
    color: white;
    font-weight: 600;
    font-size: 12pt;
    top: 4em;
    left: 1em;
    padding: 0.5em 1em 0.5em 1em;
    background-color: #87debe;
`;

export default Login;