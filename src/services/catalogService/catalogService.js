export const setItemsToLocalStorage = (list) => {
    localStorage.setItem("listOfItems", JSON.stringify(list));
}