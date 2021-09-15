export function cartReducer(state, action) {
  switch (action.type) {
    case "fetch":
      return {
        ...state,
        itemsInCart: action.payload
      };
    case "add":
      let count = 0;
      state.itemsInCart.map((item) => {
        if (item._id === action.payload._id) count = count + 1;
        return item;
      });

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
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    case "decrease":
      return {
        ...state,
        itemsInCart: state.itemsInCart.map((item) =>
          item._id === action.payload._id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      };
    case "remove":
      return {
        ...state,
        itemsInCart: state.itemsInCart.filter(
          (item) => item._id !== action.payload
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

    default:
      return state;
  }
}
