export interface MemberResponse {
    accessToken: AccessToken;
    refreshToken: RefreshToken;
}

export interface AccessToken {
    token: string;
    expiredAt: string;
}

export interface RefreshToken {
    token: string;
    expiredAt: string
}

export type LoggedInfo = UserLoggedInfo | PhotographerLoggedInfo;

export interface NonMemberResponse {
    provider: string;
    profileImg: string;
    id: string;
    email: string;
    nickname: string;
    exist: boolean;
}

export interface NonMemberParam {
    email: string;
    id: string;
    nickname: string;
    profileImg: string;
}

export interface NewMemberInfo {
    memberId: string;
    name: string;
    nickname: string;
    email: string;
    profileImg: string;
}

export interface UserLoggedInfo {
    role: string;
    name: string;
    issuer: string;
    nickname: string;
    email: string;
    memberId: string;
    exp: number;
}

export interface PhotographerLoggedInfo {
    accountId: string;
    role: string;
    name: string;
    issuer: string;
    exp: number;
}

export interface PhotographerRequestDto {
    id: number;
    accountId: string;
    password: string;
    name: string;
    region: string;
    description: string;
    carrerYear: number;
}

export interface MemberRegisterRequestDto {
    memberId: string;
    email: string;
    name: string;
    nickname: string;
    password: string;
    profileImg: string;
}

export interface DuplicatedCheckDto {
    duplicated: boolean;
}