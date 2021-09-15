import { createContext } from "react";
import { useContext, useReducer, useEffect } from "react";
import axios from "axios";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    itemsInCart: [],
    wishlist: []
  });
  useEffect(() => {
    (async () => {
      const { success, products: data } = await axios
        .get("https://express-pratice2.saswatidas.repl.co/cart")
        .then((response) => {
          console.log(response.data);
          return response.data;
        });
      console.log(data);
      console.log(success);
      dispatch({ type: "fetch", payload: data });
    })();
  }, []);

  return (
    <CartContext.Provider
      value={{
        itemsInCart: state.itemsInCart,
        wishlist: state.wishlist,
        dispatch
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export function useCart() {
  return useContext(CartContext);
}
export function cartReducer(state, action) {
  switch (action.type) {
    case "fetch":
      return {
        ...state,
        itemsInCart: action.payload
      };
    case "add":
      let count = 0;
      console.log("id", action.payload.id);
      state.itemsInCart.map((item) => {
        if (item.id === action.payload.id) count = count + 1;
        return item;
      });

      console.log("count", count);
      if (count === 0 || state.itemsInCart.length === 0)
        return {
          ...state,
          itemsInCart: [...state.itemsInCart, action.payload]
        };
      return state;
    case "increase":
      return {
        ...state,
        itemsInCart: state.itemsInCart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    case "decrease":
      return {
        ...state,
        itemsInCart: state.itemsInCart.map((item) =>
          item.id === action.payload.id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      };
    case "remove":
      return {
        ...state,
        itemsInCart: state.itemsInCart.filter(
          (item) => item.id !== action.payload.id
        )
      };
    case "move":
      return {
        ...state,
        itemsInCart: state.itemsInCart.filter(
          (item) => item.id !== action.payload.id
        ),
        wishlist: [...state.wishlist, action.payload]
      };
    case "removefromwishlist":
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item.id !== action.payload.id)
      };
    default:
      return state;
  }
}
