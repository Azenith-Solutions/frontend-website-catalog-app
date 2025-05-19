export const getListOfItemsFromLocalStorage = () => {
    const listOfItems = localStorage.getItem("listOfItems");
    return listOfItems ? JSON.parse(listOfItems) : [];
}