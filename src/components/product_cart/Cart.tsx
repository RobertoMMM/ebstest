import { FC, useContext } from "react";
import { CartContext } from "../../store/cart-context";

const Cart: FC = () => {
  const cartCtx = useContext(CartContext);
  const products = cartCtx.products;
  const addProd = (id: number, name: string, price: number) => {
    cartCtx.addProduct({
      id: id,
      name: name,
      price: price,
      amount: 1,
    });
  };
  const removeProduct = (id: number) => {
    cartCtx.removeProduct(id);
  };
  return (
    <>
      <h1>Your Cart</h1>
      <section className="mainSec">
        {products.length ? (
          <table className="mainTable">
            <tbody>
              {products &&
                products.map((prod: any) => (
                  <tr key={prod.id}>
                    <th>{prod.name}</th>
                    <th>{prod.price}$</th>
                    <th>{prod.amount}x</th>
                    <td>
                      <button
                        onClick={() => addProd(prod.id, prod.name, prod.price)}
                        className="buttonAdd"
                      >
                        Add
                      </button>
                      <button
                        className="buttonDelete"
                        onClick={() => removeProduct(prod.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p>Please enter something</p>
        )}
      </section>
    </>
  );
};

export default Cart;
