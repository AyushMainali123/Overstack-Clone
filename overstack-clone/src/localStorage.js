export const getCartFromLocalStorage = (string = "cart") =>
  JSON.parse(localStorage.getItem(string));
export const setCartItemsToLocalStorage = (name='cart', value) =>
  localStorage.setItem(name, JSON.stringify(value));
