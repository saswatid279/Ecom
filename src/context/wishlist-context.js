import { createContext } from "react";
import { useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { wishlistReducer } from "../reducers/wishlistreducer";
export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [state, wishlistdispatch] = useReducer(wishlistReducer, {
    wishlist: []
  });
  useEffect(() => {
    (async () => {
      const { success, products: data } = await axios
        .get("https://homedecor.saswatidas.repl.co/wishlist")
        .then((response) => {
          return response.data;
        });
      wishlistdispatch({ type: "fetch", payload: data });
    })();
  }, []);

  return (
    <WishlistContext.Provider
      value={{ wishlist: state.wishlist, wishlistdispatch }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
export function useWishlist() {
  return useContext(WishlistContext);
}
