import { jwtDecode } from "jwt-decode";

import { LoggedInfo } from "../types/Login";

export function decodeToken(token: string) {
    const decoded = jwtDecode<LoggedInfo>(token);
    return decoded;
}