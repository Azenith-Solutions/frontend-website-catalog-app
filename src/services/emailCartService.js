import apiClient from './api.js';

export const sendEmailCart = async (emailData) => {
    console.log("Service foi chamada e iniciou envio de email");

    try {
        console.log(emailData);
        const response = await apiClient.post('/emails/send', emailData);

        console.log("Resposta Email: ", response.data);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error(error.response?.data?.message || 'Falha ao processar o carrinho.');
    }
}

export const createOrderFromCart = async (newOrder) => {
    console.log("Service foi chamada e iniciou criação de pedido");

    try {
        const response = await apiClient.post('/orders', newOrder);

        console.log("Resposta Criar Pedido: ", response.data);
    } catch (error) {
        console.error('Error criando pedido:', error);
        throw new Error(error.response?.data?.message || 'Falha ao criar pedido.');
    }
}