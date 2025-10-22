import apiClient from '../api.js';

export async function getCategory() {
    console.log("Service foi chamada e iniciou a recuperação de categorias");

    try {
        const response = await apiClient.get(`/categorys`);
        console.log("Resposta: ", response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error(error.response?.data?.message || 'Falha ao processar');
    }
    
}