import { createContext } from "react";
import { useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { cartReducer } from "../reducers/cartreducer";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    itemsInCart: []
  });
  useEffect(() => {
    (async () => {
      const { success, products: data } = await axios
        .get("https://homedecor.saswatidas.repl.co/cart")
        .then((response) => {
          return response.data;
        });
      dispatch({ type: "fetch", payload: data });
    })();
  }, []);

  return (
    <CartContext.Provider
      value={{
        itemsInCart: state.itemsInCart,
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
