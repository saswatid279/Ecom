import { useContext, useReducer,useEffect ,createContext} from "react";
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
        .get("https://homedecors.herokuapp.com/wishlist")
        .then((response) => {
          return response.data;
        });
        if(success)
      wishlistdispatch({ type: "fetch", payload: data });
    })();
  }, [wishlistdispatch]);

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
