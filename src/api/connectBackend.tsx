import axios, { AxiosError, AxiosResponse } from 'axios';

import { refreshAccessToken } from "./Login";
import { getCookie, setCookie } from "./useCookie";

const BACKEND_ADDRESS = import.meta.env.VITE_BACKEND_API_ADDRESS;

const createAxiosInstance = () => {
    const instance = axios.create({
        baseURL: BACKEND_ADDRESS,
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
        }
    });

    // 요청 인터셉터 추가
    instance.interceptors.request.use(config => {
        const accessToken = getCookie("accessToken");
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    });

    return instance;
};

const jsonConnection = createAxiosInstance();
const formDataConnection = createAxiosInstance();
const tokenConnection = createAxiosInstance();

// 각 인스턴스의 Content-Type 설정
formDataConnection.defaults.headers['Content-Type'] = 'application/form-data';
tokenConnection.defaults.headers['Authorization'] = `Bearer ${getCookie("refreshToken")}`;

const failedQueue: Array<{ resolve: (value?: unknown) => void; reject: (error: unknown) => void }> = [];
let isRefreshing = false; // 토큰 갱신 중 여부를 추적하는 플래그

jsonConnection.interceptors.response.use(
    (response: AxiosResponse) => {
        return response; // 정상적인 응답은 그대로 반환
    },
    async (error: AxiosError) => {
        const originalRequest = error.config;
        const errorCode = error.response?.status;

        if (errorCode === 2001) {
            if (isRefreshing) {
                // 이미 토큰 갱신 중이면 요청을 큐에 저장
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest!.headers['Authorization'] = `Bearer ${token}`;
                    return jsonConnection(originalRequest!);
                });
            }

            isRefreshing = true; // 토큰 갱신 시작

            try {
                const newToken = await refreshAccessToken();
                setCookie("accessToken", newToken); // 새로운 토큰 저장

                // 큐에 있는 요청 처리
                failedQueue.forEach(({ resolve }) => resolve(newToken));
                failedQueue.length = 0; // 큐 비우기

                originalRequest!.headers['Authorization'] = `Bearer ${newToken}`;
                
                return jsonConnection(originalRequest!); // 원래 요청 재시도
            } catch (err) {
                console.error("Token refresh failed: ", err);
                // 큐에 있는 요청을 거부
                failedQueue.forEach(({ reject }) => reject(err));
                failedQueue.length = 0; // 큐 비우기
                return Promise.reject(err);
            } finally {
                isRefreshing = false; // 토큰 갱신 완료
            }
        }

        return Promise.reject(error); // 다른 에러는 그대로 반환
    }
);

export { jsonConnection, formDataConnection, tokenConnection };
