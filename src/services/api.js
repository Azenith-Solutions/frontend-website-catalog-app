import axios from 'axios';

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;

const apiClient = axios.create({
    baseURL: API_URL_BASE,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default apiClient;