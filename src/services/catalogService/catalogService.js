import { getListOfItemsFromLocalStorage } from '../../utils/storage/storage';
import apiClient from '../api';


export const addItemToCart = (component) => {
    const listOfItems = getListOfItemsFromLocalStorage();
    const item = listOfItems.find((item) => item.fkComponente === component.idComponente);

    // Usa a quantidade recebida ou 1 como padrão
    const quantidadeAdicionar = Number(component.quantidadeCarrinho) > 0 ? Number(component.quantidadeCarrinho) : 1;

    if (item) {
        item.quantidadeCarrinho += quantidadeAdicionar;
    } else {
        listOfItems.push({
            fkComponente: component.idComponente,
            nomeComponente: component.nomeComponente,
            descricao: component.descricao,
            emEstoque: component.quantidade,
            imagem: component.imagem,
            quantidadeCarrinho: quantidadeAdicionar
        });
    }

    localStorage.setItem('listOfItems', JSON.stringify(listOfItems));
}

// Diminui a quantidade de um item no carrinho
export const decreaseItemQuantity = (component) => {
    const listOfItems = getListOfItemsFromLocalStorage();
    const item = listOfItems.find((item) => item.fkComponente === component.idComponente);

    if (item) {
        item.quantidadeCarrinho -= 1;
        if (item.quantidadeCarrinho <= 0) {
            // Remove o item se a quantidade for 0 ou menor
            const updatedList = listOfItems.filter((i) => i.fkComponente !== component);
            localStorage.setItem('listOfItems', JSON.stringify(updatedList));
            return;
        }
    }
    localStorage.setItem('listOfItems', JSON.stringify(listOfItems));
}

export const updateItemQuantity = (component, newQuantity) => {
    const listOfItems = getListOfItemsFromLocalStorage();
    const item = listOfItems.find((item) => item.fkComponente === component.idComponente);

    if (item) {
        item.quantidadeCarrinho = Number(newQuantity);
        if (item.quantidadeCarrinho <= 0) {
            const updatedList = listOfItems.filter((i) => i.fkComponente !== component.idComponente);
            localStorage.setItem('listOfItems', JSON.stringify(updatedList));
            return;
        }
        localStorage.setItem('listOfItems', JSON.stringify(listOfItems));
    }
}

// Remove completamente um item do carrinho
export const removeItemFromCart = (component) => {
    const listOfItems = getListOfItemsFromLocalStorage();
    const updatedList = listOfItems.filter((item) => item.fkComponente !== component.idComponente);
    localStorage.setItem('listOfItems', JSON.stringify(updatedList));
}


/**
 * Envia email de componente avulso com anexo (imagem) usando endpoint /emails/send-with-attachment
 * @param {FormData} formPayload
 */
export const sendEmailComponentWithAttachment = async (formPayload) => {
    try {
        const response = await apiClient.post('/emails/send-with-attachment', formPayload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error sending email with attachment:', error);
        throw new Error(error.response?.data?.message || 'Falha ao enviar email com anexo.');
    }
};