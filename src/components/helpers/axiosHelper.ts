import axios from 'axios';

export const axiosHelper = axios.create({
    // localHost
    baseURL: 'http://localhost:3030/api/v1/admins',
    // baseURL: 'http://localhost:3030/api/v1/mobiles',
});

export interface APIResponse {
    code: string;
    message: string;
    data: any;
}