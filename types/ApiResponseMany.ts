export type ApiResponseMany<T> = {
 status: 'success' | 'error';
 results: number;
 totalResults: number;
 data: T;
}

export type ApiResponseSingle<T> = {
    status: 'success' | 'error';
    data: T;
};