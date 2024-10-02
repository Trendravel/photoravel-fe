/* eslint-disable @typescript-eslint/no-unused-vars */
import { NavigateOptions } from "react-router-dom";

import { jsonConnection, tokenConnection } from "./connectBackend";
import { decodeToken } from "./decodeToken"
import { getCookie, removeCookie, setCookie } from "./useCookie";
import { ApiResponse } from "../types/Common";
import { AccessToken, MemberResponse, NonMemberResponse, PhotographerLoggedInfo, RefreshToken, UserLoggedInfo } from "../types/Login";

const isUserLoggedInfo = (data: any): data is UserLoggedInfo => {
    return data.role === "user" &&
           typeof data.nickname === "string" &&
           typeof data.email === "string" &&
           typeof data.memberId === "string";
};

const isPhotographerLoggedInfo = (data: any): data is PhotographerLoggedInfo => {
    return data.role === "photographer" && typeof data.accountId === "string";
};

const isNonMemberResponse = (data: any): data is NonMemberResponse => {
    return typeof data.provider === "string" &&
           typeof data.profileImg === "string" &&
           typeof data.id === "string" &&
           typeof data.email === "string" &&
           typeof data.nickname === "string" &&
           typeof data.exist === "boolean";
};

const isAccessToken = (data: any): data is AccessToken => {
    return typeof data.token === "string" && typeof data.expiresIn === "number";
};

const isRefreshToken = (data: any): data is RefreshToken => {
    return typeof data.token === "string" && typeof data.expiresIn === "number";
};

const isMemberResponse = (data: any): data is MemberResponse => {
    return isAccessToken(data.accessToken) && isRefreshToken(data.refreshToken);
};



export const doOAuthLogin = async (code: string, navigate: (path: string, options?: NavigateOptions) => void) => {

    await jsonConnection
    .get<ApiResponse<NonMemberResponse|MemberResponse>>(`/login/oauth2/code/kakao?code=${code}`)
    .then((res) => {
        console.log("success");
        if (isNonMemberResponse(res.data.data)) {
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
            if (isMemberResponse(res.data.data)) {
                const data: MemberResponse = res.data.data;
                if (data)
                    setOAuthLogin(data, navigate);
            }
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
    console.log(response);
    setCookie("accessToken", response.accessToken.token);
    setCookie("refreshToken", response.refreshToken.token);

    const userData: UserLoggedInfo | PhotographerLoggedInfo = decodeToken(response.accessToken.token); 

    if (isUserLoggedInfo(userData)) {
        setCookie("name", userData.name);
        setCookie("nickname", userData.nickname);
        setCookie("email", userData.email);
        setCookie("memberId", userData.memberId);
    } else if (isPhotographerLoggedInfo(userData)) {
        setCookie("name", userData.name);
        setCookie("accountId", userData.accountId);
    } else {
        console.error("Invalid user data");
    }

    navigate('/');
};


export const doLocalUserLogin = (accessToken: string|undefined, refreshToken: string|undefined) => {
    if (accessToken && refreshToken) {
        setCookie("accessToken", accessToken);
        setCookie("refreshToken", refreshToken);

        type LoggedInfo = UserLoggedInfo | PhotographerLoggedInfo;

        const userData: LoggedInfo = decodeToken(accessToken);

        const isUserLoggedInfo = (data: any): data is UserLoggedInfo => {
            return data.role === "user" && typeof data.nickname === "string" && typeof data.email === "string" && typeof data.memberId === "string";
        };
        
        const isPhotographerLoggedInfo = (data: any): data is PhotographerLoggedInfo => {
            return data.role === "photographer" && typeof data.accountId === "string";
        };
        
        // 타입 체크
        if (isUserLoggedInfo(userData)) {
            // 일반 유저의 경우
            setCookie("name", userData.name);
            setCookie("role", userData.role);
            setCookie("nickname", userData.nickname);
            setCookie("email", userData.email);
            setCookie("memberId", userData.memberId);
        } else if (isPhotographerLoggedInfo(userData)) {
            // 포토그래퍼의 경우
            setCookie("name", userData.name);
            setCookie("role", userData.role);
            setCookie("accountId", userData.accountId);
        } else {
            // 유효하지 않은 데이터 처리
            console.error("Invalid user data");
        }
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
    removeCookie("accountId");
    removeCookie("role");
}

export const refreshAccessToken = async ():Promise<string> => {
    let newToken = "";
    await tokenConnection.post('/auth/refresh-token', {
        "refreshToken": getCookie("refreshToken")
    })
    .then((res) => newToken = res.data.data.token)
    .catch((e) => console.log(e))
    console.log(newToken)

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(newToken); // 새로 갱신된 Access Token 반환
        }, 1000);
    });

}