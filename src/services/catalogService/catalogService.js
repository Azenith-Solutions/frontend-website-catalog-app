import { getListOfItemsFromLocalStorage } from '../../utils/storage/storage';

export const addItemToCart = (component) => {
    const listOfItems = getListOfItemsFromLocalStorage();
    const item = listOfItems.find((item) => item.fkComponente === component.idComponente);

    if (item) {
        item.quantidade += 1;
    } else {
        listOfItems.push({ 
            fkComponente: component.idComponente, 
            descricao: component.descricao, 
            emEstoque: component.quantidade, 
            quantidade: 1 });
    }

    localStorage.setItem('listOfItems', JSON.stringify(listOfItems));
}

// Diminui a quantidade de um item no carrinho
export const decreaseItemQuantity = (component) => {
    const listOfItems = getListOfItemsFromLocalStorage();
    const item = listOfItems.find((item) => item.fkComponente === component.idComponente);

    if (item) {
        item.quantidade -= 1;
        if (item.quantidade <= 0) {
            // Remove o item se a quantidade for 0 ou menor
            const updatedList = listOfItems.filter((i) => i.fkComponente !== component);
            localStorage.setItem('listOfItems', JSON.stringify(updatedList));
            return;
        }
    }
    localStorage.setItem('listOfItems', JSON.stringify(listOfItems));
}

// Remove completamente um item do carrinho
export const removeItemFromCart = (component) => {
    const listOfItems = getListOfItemsFromLocalStorage();
    const updatedList = listOfItems.filter((item) => item.fkComponente !== component.idComponente);
    localStorage.setItem('listOfItems', JSON.stringify(updatedList));
}