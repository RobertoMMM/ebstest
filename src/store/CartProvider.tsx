import { useReducer } from "react";
import { CartContext } from "./cart-context";

const initialState = {
  products: [],
};

const cartReducer = (state: any, action: any) => {
  if (action.type === "ADDPROD") {

    const hasProductIndex = state.products.findIndex( // find index of the same element in arr
      (element: any) => element.id === action.payload.id
    );
    const hasProduct = state.products[hasProductIndex]; // find element

    let updatedProducts = [...state.products, action.payload]; 
    let updatedProduct; // we will update the amount of the element

    if (hasProduct) { //check if exist same product in arr
      updatedProduct = { // we update the amount
        ...hasProduct,
        amount: hasProduct.amount++,
      };
      updatedProducts = [...state.products]; 
      updatedProducts[hasProductIndex] = updatedProduct; // update the element in arr
    }
    return {
      ...state,
      products: updatedProducts,
    };
  }
  if (action.type === "REMOVEPROD") {
    const hasProductIndex = state.products.findIndex( // find index of the same element in arr
      (element: any) => element.id === action.payload
    );
    let updatedProducts = [...state.products];
    const hasProduct = state.products[hasProductIndex];// find element
    if (hasProductIndex !== -1) { // if element is not find
      if (hasProduct.amount < 1) { // if amount is < 1 element will be removed
        updatedProducts = state.products.filter(
          (element: any) => element.id !== action.payload
        );
        alert("Item removed");
      } else {
        const updatedProduct = { ...hasProduct, amount: hasProduct.amount-- }; // amount decrement
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
