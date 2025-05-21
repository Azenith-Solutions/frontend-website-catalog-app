import apiClient from './api.js';

export async function getComponent(filters) {
    console.log("Service foi chamada e iniciou a recuperação de componentes");

    try {
        const response = await apiClient.get(`/components/catalog${filters}`);
        console.log("Resposta: ", response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error(error.response?.data?.message || 'Falha ao processar');
    }
}