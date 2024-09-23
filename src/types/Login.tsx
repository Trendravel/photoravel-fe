export interface MemberResponse {
    accessToken: AccessToken;
    refreshToken: RefreshToken;
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
    profileImg: File;
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

export interface LoggedInfo {
    name: string;
    nickname: string;
    email: string;
    memberId: string;
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