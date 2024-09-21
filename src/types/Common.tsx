export interface ApiResponse<T> {
    result: Result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: T;
}

interface Result {
    resultCode: number;
    resultMessage: string;
}