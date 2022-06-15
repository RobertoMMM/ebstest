import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import ProductsList from "./products/ProductsList";
import Cart from "./product_cart/Cart";

const Main: FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </>
  );
};

export default Main;
