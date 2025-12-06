import apiClient from '../api';
import { getListOfItemsFromLocalStorage } from '../../utils/storage/storage';

export const sendEmailCart = async (emailData) => {
    console.log("Service foi chamada e iniciou envio de email");

    try {
        console.log(emailData);
        const response = await apiClient.post('/emails/send-quote', emailData);

        console.log("Resposta Email: ", response.data);
        return response;
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error(error.response?.data?.message || 'Falha ao processar o carrinho.');
    }
}

export const publishOrder = async (newOrder) => {
    console.log("Service foi chamada e iniciou criação de pedido");

    try {
        const response = await apiClient.post('/orders/publish', newOrder);
        console.log("Response order created:", response.data);
        return response;
    } catch (error) {
        console.error('Error creating order:', error);
        throw new Error(error.response?.data?.message || 'Failure creating order');
    }
}

export const publishOrderWithQuote = async (orderData, emailData) => {
    console.log("Publishing order with quote email caching");

    try {
        const payload = {
            order: orderData,
            emailData: emailData
        };
        
        console.log("Payload being sent:", payload);
        
        const response = await apiClient.post('/orders/publish-with-quote', payload);
        console.log("Response from publish-with-quote:", response.data);
        return response;
    } catch (error) {
        console.error('Error publishing order with quote:', error);
        throw new Error(error.response?.data?.message || 'Falha ao publicar pedido com cotação');
    }
}

export const createOrder = async (newOrder) => {
    console.log("Service foi chamada e iniciou criação de pedido");

    try {
        const response = await apiClient.post('/orders', newOrder);
        console.log("Response order created:", response.data);
        return response;
    } catch (error) {
        console.error('Error creating order:', error);
        throw new Error(error.response?.data?.message || 'Failure creating order');
    }
}

export async function insertItems(orderId) {
    const listOfItems = getItems();

    console.log("List of items to insert:", listOfItems);
    console.log("Order ID:", orderId);

    const processedList = listOfItems.map(item => {
        return {
            ...item,
            fkPedido: orderId,
        };
    });

    console.log("Processed items to insert:", processedList);

    try {
        const response = await apiClient.post('/items', processedList);
        console.log("Response items created:", response.data);
        console.log("Inserted items response:", response.data);
        return response;
    } catch (error) {
        console.error("Error inserting items", error);
        throw new Error(error.response?.data?.message || 'Failure inserting items');
    }
}

export const getItems = () => {
    return getListOfItemsFromLocalStorage();
}

export const removeItemFromLocalStorage = (item) => {
    const listOfItems = getItems();
    const updatedList = listOfItems.filter((actualItem) => actualItem.id !== item.id);
    localStorage.setItem("listOfItems", JSON.stringify(updatedList));
}

export const clearLocalStorage = () => {
    localStorage.removeItem("listOfItems");
}