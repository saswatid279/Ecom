export function wishlistReducer(state, action) {
  switch (action.type) {
    case "fetch":
      return {
        ...state,
        wishlist: action.payload
      };
    case "addtowishlist":
      let count = 0;
      state.wishlist.map((item) => {
        if (item._id === action.payload._id) count = count + 1;
        return item;
      });

      if (count === 0 || state.wishlist.length === 0)
        return {
          ...state,
          wishlist: [...state.wishlist, action.payload]
        };
      return state;
    case "remove":
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item._id !== action.payload)
      };
    default:
      return state;
  }
}
