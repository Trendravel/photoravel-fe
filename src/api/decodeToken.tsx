import { jwtDecode } from "jwt-decode";

export function decodeToken(token: string) {
    const decoded = jwtDecode(token);
    return decoded;
}