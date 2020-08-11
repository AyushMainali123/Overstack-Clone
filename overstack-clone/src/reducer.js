export const initialState = {
  items: [],
  cart: [],
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEMS":
      return { ...state, items: [...state.items, ...action.payload.items] };
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, { ...action.payload.item }] };
    case "UPDATE_QUANTITY":
      const newCart = state.cart.map((cartItem) => {
        return cartItem.id === action.payload.id
          ? { ...cartItem, quantity: action.payload.quantity }
          : { ...cartItem };
      });
      return { ...state, cart: newCart };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(
          (cartItem) => cartItem.id !== action.payload.id
        ),
      };
    case "SET_USER":
      return { ...state, user: action.payload.user };
    default:
      return state;
  }
};

export default reducer;
