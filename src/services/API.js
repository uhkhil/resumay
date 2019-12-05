import axios from 'axios';
import { Auth } from './Auth';

const baseUrl = 'http://localhost:8000'
// const baseUrl = 'https://resumay.herokuapp.com'
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

// TODO: Add interceptor for 401 calls and logout / handle it

const fetchResume = (userId) => axios.get(baseUrl + endpoints.resume, { params: { userId } })
const createResume = (data) => axios.post(baseUrl + endpoints.resume, data)
const updateResume = (data) => axios.patch(baseUrl + endpoints.resume, data)

export const API = {
    fetchResume,
    createResume,
    updateResume
}
