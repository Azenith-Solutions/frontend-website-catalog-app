import { getListOfItemsFromLocalStorage } from '../../utils/storage/storage';

export const addItemToCart = (componentId) => {
    const listOfItems = getListOfItemsFromLocalStorage();
    const item = listOfItems.find((item) => item.id === componentId);

    if (item) {
        item.quantidade += 1;
    } else {
        listOfItems.push({ fkComponente: componentId, quantidade: 1 });
    }

    localStorage.setItem('listOfItems', JSON.stringify(listOfItems));
}

