import axios from 'axios';
import { Auth } from './Auth';

const baseUrl = 'https://resumay.herokuapp.com'
const endpoints = {
    resume: '/resume'
}

axios.interceptors.request.use(config => {
    config.headers = {
        accessToken: Auth.getToken().accessToken,
        idToken: Auth.getToken().idToken
    }
    return config;
}, error => {
    return Promise.reject(error);
})

// TODO: Add interceptor for non 401 calls

const fetchResume = (userId) => axios.get(baseUrl + endpoints.resume, { params: { userId } })
const createResume = (userId, data) => axios.post(baseUrl + endpoints.resume, data, { params: { userId } })
const updateResume = (userId, data) => axios.patch(baseUrl + endpoints.resume, data, { params: { userId } })

export const API = {
    fetchResume,
    createResume,
    updateResume
}
