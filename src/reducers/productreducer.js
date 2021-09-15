export default function productReducer(state, action) {
  switch (action.type) {
    case "SORT":
      return { ...state, sortBy: action.payload };
    case "Toggle_inventory":
      return (state = {
        ...state,
        showInventoryAll: !state.showInventoryAll
      });
    case "TOGGLE_DELIVERY":
      return (state = {
        ...state,
        showFastDeliveryOnly: !state.showFastDeliveryOnly
      });
    default:
      return state;
  }
}
