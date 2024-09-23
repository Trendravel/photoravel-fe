/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

import { decodeToken } from "./decodeToken"
import { removeCookie, setCookie } from "./useCookie";
import { LoggedInfo } from "../types/Login";

const BACKEND_ADDRESS = import.meta.env.VITE_BACKEND_API_ADDRESS;

export const doOAuthLogin = (code: string) => {
    let userData:LoggedInfo;

    console.log(code);

    axios
    .get(BACKEND_ADDRESS+`/login/oauth2/code/kakao?code=${code}`)
    .then((res) => {
        console.log(res);
        
    })
    .catch((e) => console.log("err: ", e))
    /*
    setCookie("name", userData.name);
    setCookie("nickname", userData.nickname);
    setCookie("email", userData.email);
    setCookie("memberId", userData.memberId);
    **/
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
    removeCookie("name");
    removeCookie("nickname");
    removeCookie("email");
    removeCookie("memberId");
}