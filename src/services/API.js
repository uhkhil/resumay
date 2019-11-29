import axios from 'axios';

const baseUrl = 'http://localhost:8000'
const endpoints = {
    resume: '/resume'
}

const fetchResume = (userId) => axios.get(baseUrl + endpoints.resume, { params: { userId } })

const updateResume = (userId, data) => axios.patch(baseUrl + endpoints.resume, data, { params: { userId } })

export const API = {
    fetchResume,
    updateResume
}
