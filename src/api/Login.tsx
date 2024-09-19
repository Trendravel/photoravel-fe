/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

import { decodeToken } from "./decodeToken"
import { removeCookie, setCookie } from "./useCookie";
import { LoggedInfo } from "../types/Login";

const BACKEND_ADDRESS = import.meta.env.VITE_BACKEND_API_ADDRESS;

// const JWT = "eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoi7J2066aEIiwibmlja25hbWUiOiLri4nrhKTsnoQiLCJlbWFpbCI6Inlvc2hpNzU5MUBuYXZlci5jb20iLCJtZW1iZXJJZCI6Im1lbWJlcklEIiwiZXhwIjoxNzI0ODMxNjY3fQ.L-LRxO_NvNMg8-c87f7GG6BzNLYnkF882cpPTYCDkJs"

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