export interface ResponseData<T = any> {
    data: T;
    message: string;
    statusCode: number;
    show: boolean;
}
