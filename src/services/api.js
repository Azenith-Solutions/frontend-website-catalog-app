import axios from 'axios';

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE || '/api/v2';

console.log('🔍 Environment:', import.meta.env.MODE);
console.log('🌐 API Base URL:', API_URL_BASE);
console.log('🔧 All env vars:', import.meta.env);

const apiClient = axios.create({
    baseURL: API_URL_BASE,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default apiClient;