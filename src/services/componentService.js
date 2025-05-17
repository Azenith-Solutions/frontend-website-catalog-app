import apiClient from './api.js';

export async function getComponent(paginaAtual, limitePorPagina){
    console.log("Service foi chamada e iniciou a recuperação de componentes");

    try {
        const response = await apiClient.get(`/api/v1/components/catalog?page=${paginaAtual}&size=${limitePorPagina}`);
        console.log("Resposta: ", response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error(error.response?.data?.message || 'Falha ao processar');
    }
}