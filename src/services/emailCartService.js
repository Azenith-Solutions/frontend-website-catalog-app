import apiClient from './api.js';

export const sendEmailCart = async (emailData) => {
    console.log("Service foi chamada e iniciou envio de email");

    try {
        console.log(emailData);
        const response = await apiClient.post('/send', emailData);

        console.log("Resposta Email: ", response.data);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error(error.response?.data?.message || 'Falha ao processar o carrinho.');
    }
}