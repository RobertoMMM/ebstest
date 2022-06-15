import { useReducer } from "react";
import { CartContext } from "./cart-context";

const initialState = {
  products: [],
};

const cartReducer = (state: any, action: any) => {
  if (action.type === "ADDPROD") {
    const hasProductIndex = state.products.findIndex(
      (element: any) => element.id === action.payload.id
    );
    const hasProduct = state.products[hasProductIndex];
    let updatedProducts = [...state.products, action.payload];
    let updatedProduct;
    if (hasProduct) {
      updatedProduct = {
        ...hasProduct,
        amount: hasProduct.amount++,
      };
      updatedProducts = [...state.products];
      updatedProducts[hasProductIndex] = updatedProduct;
    }
    return {
      ...state,
      products: updatedProducts,
    };
  }
  if (action.type === "REMOVEPROD") {
    const hasProductIndex = state.products.findIndex(
      (element: any) => element.id === action.payload
    );
    let updatedProducts = [...state.products];
    if (hasProductIndex !== -1) {
      const hasProduct = state.products[hasProductIndex];
      if (hasProduct.amount < 1) {
        updatedProducts = state.products.filter(
          (element: any) => element.id !== action.payload
        );
        alert("Item removed");
      } else {
        const updatedProduct = { ...hasProduct, amount: hasProduct.amount-- };
        updatedProducts[hasProductIndex] = updatedProduct;
      }
    }
    return {
      ...state,
      products: updatedProducts,
    };
  }
  return initialState;
};

const CartProvider = (props: any) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);
  const addProductToCart = (prod: any) => {
    dispatch({ type: "ADDPROD", payload: prod });
  };
  const removeProductToCart = (id: number) => {
    dispatch({ type: "REMOVEPROD", payload: id });
  };

  const cartContext = {
    products: cartState.products,
    addProduct: addProductToCart,
    removeProduct: removeProductToCart,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
