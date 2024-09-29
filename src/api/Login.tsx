/* eslint-disable @typescript-eslint/no-unused-vars */
import { NavigateOptions, useNavigate } from "react-router-dom";

import { jsonConnection, tokenConnection } from "./connectBackend";
import { decodeToken } from "./decodeToken"
import { getCookie, removeCookie, setCookie } from "./useCookie";
import { ApiResponse } from "../types/Common";
import { LoggedInfo, MemberResponse, NonMemberResponse } from "../types/Login";

export const doOAuthLogin = async (code: string, navigate: (path: string, options?: NavigateOptions) => void) => {

    await jsonConnection
    .get<ApiResponse<NonMemberResponse|MemberResponse>>(`/login/oauth2/code/kakao?code=${code}`)
    .then((res) => {
        console.log("success");
        if (res.data.data?.exist === false) {
            const userInfo:NonMemberResponse = res.data.data;
            navigate('/oauthlogin/addinfo', {
                state: {
                    profileImg: userInfo.profileImg,
                    nickname: userInfo.nickname,
                    id: userInfo.id,
                    email: userInfo.email
                }
            })
        } else {
            setOAuthLogin(res.data.data, navigate);
        }
        
    })
    .catch((e) => console.log("err: ", e))
    /*
    setCookie("name", userData.name);
    setCookie("nickname", userData.nickname);
    setCookie("email", userData.email);
    setCookie("memberId", userData.memberId);
    **/
}

export const setOAuthLogin = (response: MemberResponse, navigate: (path: string, options?: NavigateOptions) => void) => {
    console.log(response)
    setCookie("accessToken", response.accessToken.token);
    setCookie("refreshToken", response.refreshToken.token);
    
    const userData:LoggedInfo = decodeToken(response.accessToken.token);
    setCookie("name", userData.name);
    setCookie("nickname", userData.nickname);
    setCookie("email", userData.email);
    setCookie("memberId", userData.memberId);
    
    navigate('/');
}

export const doLocalUserLogin = (accessToken: string|undefined, refreshToken: string|undefined) => {
    if (accessToken && refreshToken) {
        setCookie("accessToken", accessToken);
        setCookie("refreshToken", refreshToken);

        const userData:LoggedInfo = decodeToken(accessToken);
        setCookie("name", userData.name);
        setCookie("nickname", userData.nickname);
        setCookie("email", userData.email);
        setCookie("memberId", userData.memberId);
    } else {
        console.error("로그인 처리 중 토큰 값 이상 발견")
    }
}

export const doLogout = () => {
    jsonConnection.post('/auth/logout', {
        "refreshToken": getCookie("refreshToken")
    })
    removeCookie("name");
    removeCookie("nickname");
    removeCookie("email");
    removeCookie("memberId");
}

export const refreshAccessToken = async ():Promise<string> => {
    let newToken = "";
    await tokenConnection.post('/auth/refresh-token', {
        "refreshToken": getCookie("refreshToken")
    })
    .then((res) => newToken = res.data.data.token)
    .catch((e) => console.log(e))

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(newToken); // 새로 갱신된 Access Token 반환
        }, 1000);
    });

}