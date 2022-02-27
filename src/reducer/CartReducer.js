export default function cartReducer(state, action) {
  switch (action.type) {
    case "empty": {
      return [];
    }
    case "add": {
      const { id, sku } = action;
      const itemInCart = state.find((item) => item.sku === sku);
      if (itemInCart) {
        return state.map((item) =>
          item.sku === sku ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...state, { id, sku, quantity: 1 }];
      }
    }

    case "updateQuantity": {
      const { quantity, sku } = action;
      return quantity === 0
        ? state.filter((item) => item.sku !== sku)
        : state.map((item) =>
            item.sku === sku ? { ...item, quantity } : item
          );
    }
    default:
      throw new Error("cartReducer Unhandler action: " + action.type);
  }
}
