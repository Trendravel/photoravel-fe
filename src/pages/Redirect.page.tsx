/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { doOAuthLogin } from '../api/Login';

const Container = styled.div`
    text-align: center;
`;

const RedirectPage = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [param] = useSearchParams();
    const KEY = param.get("code"); // 파라미터에서 코드를 보내주기 위해 분류

    const navigate = useNavigate();
    
    useEffect(() => {
        if (KEY) {
            doOAuthLogin(KEY, navigate);
            /*
            setCookie("name", userData.name);
            setCookie("nickname", userData.nickname);
            setCookie("email", userData.email);
            setCookie("memberId", userData.memberId);
            **/
        }
    }, [param])

    return (
        <Container>Redirecting..</Container>
    );
}

export default RedirectPage;