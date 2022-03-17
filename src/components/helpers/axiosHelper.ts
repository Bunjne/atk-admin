import axios from 'axios';

export const axiosHelper = axios.create({
    // localHost
    baseURL: 'http://localhost:3030/api/v1/admins',
    // baseURL: 'https://a7c2-168-120-248-17.ngrok.io/api/v1/admins'
});

export interface APIResponse {
    code: string;
    message: string;
    data: any;
}