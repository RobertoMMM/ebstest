import { createContext } from "react";

export const CartContext = createContext({
  products: [],
  addProduct: (prod: any) => {},
  removeProduct: (id: number) => {},
});
