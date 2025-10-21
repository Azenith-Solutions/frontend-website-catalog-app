import apiClient from './api.js';

export async function getComponent(filters) {
    console.log("Service foi chamada e iniciou a recuperação de componentes");

    try {
        const response = await apiClient.get(`/eletronic-components/catalog${filters}`);
        console.log("Resposta: ", response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error(error.response?.data?.message || 'Falha ao processar');
    }
    
}

export async function getWhereComponentFilter(filters) {
    console.log("Service foi chamada e iniciou a recuperação de componentes");

    try {
        const response = await apiClient.post(`/eletronic-components/filterComponentList`, filters);
        console.log("Resposta WHERE: ", response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error(error.response?.data?.message || 'Falha ao processar');
    }
    
}

export async function getComponentById(id) {
    console.log("Service foi chamada e iniciou a recuperação do componente");

    try {
        const response = await apiClient.get(`/eletronic-components/details/${id}`);
        console.log("Resposta componente by id: ", response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error(error.response?.data?.message || 'Falha ao processar');
    }
    
}