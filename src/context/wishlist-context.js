import { createContext } from "react";
import { useContext, useReducer } from "react";

import { wishlistReducer } from "../reducers/wishlistreducer";
export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [state, wishlistdispatch] = useReducer(wishlistReducer, {
    wishlist: []
  });
 

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
