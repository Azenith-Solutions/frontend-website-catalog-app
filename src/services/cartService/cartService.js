import apiClient from '../api';
import { getListOfItemsFromLocalStorage } from '../../utils/storage/storage';

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

        console.log("Response order created:", response.data);
    } catch (error) {
        console.error('Error creating order:', error);
        throw new Error(error.response?.data?.message || 'Failure creating order');
    }
}

export const insertItems = async () => {
    const listOfItems = getItems();

    try {
        const response = await apiClient.post('/items', listOfItems);

        console.log("Inserted items response:", response.data);
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