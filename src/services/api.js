import axios from 'axios';

const API_URL_BASE = "API_URL_BASE";

const apiClient = axios.create({
    baseURL: API_URL_BASE,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default apiClient;