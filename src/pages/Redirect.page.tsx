/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { decodeToken } from '../api/decodeToken';
import { doLogin } from '../api/Login';
import { MemberResponse, NonMemberResponse } from '../types/Login';

const Container = styled.div`
    text-align: center;
`;

const RedirectPage = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [param, setParam] = useSearchParams();
    const KEY = param.get("code"); // 파라미터에서 코드를 보내주기 위해 분류

    const navigate = useNavigate();

    useEffect(() => {
        if (KEY)
            doLogin(KEY);
        /* axios.post(`http://localhost:8080/login/oauth2/code/kakao?code=${KEY}`)
            .then((res) => {
                const result:MemberResponse|NonMemberResponse = res.data
                console.log("Login succeed")
            })
            .catch((e) => { console.log(e) }) **/
        navigate('/');
    }, [param])

    return (
        <Container>Redirecting..</Container>
    );
}

export default RedirectPage;