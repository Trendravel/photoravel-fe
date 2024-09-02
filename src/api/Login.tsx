import { decodeToken } from "./decodeToken"
import { removeCookie, setCookie } from "./useCookie";
import { LoggedInfo } from "../types/Login";

const JWT = "eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoi7J2066aEIiwibmlja25hbWUiOiLri4nrhKTsnoQiLCJlbWFpbCI6Inlvc2hpNzU5MUBuYXZlci5jb20iLCJtZW1iZXJJZCI6Im1lbWJlcklEIiwiZXhwIjoxNzI0ODMxNjY3fQ.L-LRxO_NvNMg8-c87f7GG6BzNLYnkF882cpPTYCDkJs"

export const doLogin = () => {
    const userData:LoggedInfo = decodeToken(JWT);
    setCookie("name", userData.name);
    setCookie("nickname", userData.nickname);
    setCookie("email", userData.email);
    setCookie("memberId", userData.memberId);
}

export const doLogout = () => {
    removeCookie("name");
    removeCookie("nickname");
    removeCookie("email");
    removeCookie("memberId");
}