export interface MemberResponse {
    result: Result;
    data: {
        accessToken: AccessToken;
        refreshToken: RefreshToken;
    };
}

interface Result {
    resultCode: number;
    resultMessage: string;
}

interface AccessToken {
    token: string;
    expiredAt: string;
}

interface RefreshToken {
    token: string;
    expiredAt: string
}

export interface NonMemberResponse {
    provider: string;
    profileImg: string;
    email: string;
    nickname: string;
    exist: boolean;
}

export interface NewMemberInfo {
    memberId: string;
    name: string;
    nickname: string;
    email: string;
    profileImg: string;
}