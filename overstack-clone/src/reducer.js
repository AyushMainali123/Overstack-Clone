import { setCartItemsToLocalStorage } from "./localStorage";
import CartItem from "./CartItem";

export const initialState = {
  items: [],
  cart: [],
  itemsToShow: [],
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEMS":
      const itemsToBeAdded = [...state.items, ...action.payload.items]
      return { ...state, items: itemsToBeAdded, itemsToShow: itemsToBeAdded };
    case "UPDATE_ITEMS_TO_SHOW":
      return {...state, itemsToShow: action.payload.itemsToShow}
    case "ADD_TO_CART":
      setCartItemsToLocalStorage("cart", [
        ...state.cart,
        { ...action.payload.item },
      ]);
      return { ...state, cart: [...state.cart, { ...action.payload.item }] };
    case "UPDATE_QUANTITY":
      const newCart = state.cart.map((cartItem) => {
        return cartItem.id === action.payload.id
          ? { ...cartItem, quantity: action.payload.quantity }
          : { ...cartItem };
      });
      setCartItemsToLocalStorage("cart", newCart);
      return { ...state, cart: newCart };
    case "REMOVE_FROM_CART":
      const newCartAfterRemoval = state.cart.filter((CartItem) => CartItem.id !== action.payload.id)
      setCartItemsToLocalStorage('cart', newCartAfterRemoval)
      return {
        ...state,
        cart: newCartAfterRemoval,
      };
    case "CLEAR_CART":
      setCartItemsToLocalStorage('cart', [])
      return {
        ...state,
        cart: [],
      };
    case "SET_USER":
      return { ...state, user: action.payload.user };
    default:
      return state;
  }
};

export default reducer;
