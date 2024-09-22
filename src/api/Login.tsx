/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

import { decodeToken } from "./decodeToken"
import { removeCookie, setCookie } from "./useCookie";
import { LoggedInfo } from "../types/Login";

const BACKEND_ADDRESS = import.meta.env.VITE_BACKEND_API_ADDRESS;

export const doLogin = (code: string) => {
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

export const doLogout = () => {
    removeCookie("name");
    removeCookie("nickname");
    removeCookie("email");
    removeCookie("memberId");
}