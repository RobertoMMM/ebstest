import { FC, useContext, useEffect, useState } from "react";
import { CartContext } from "../../store/cart-context";
import "./ProductList.css";
interface ProductList {
  id: number;
  name: string;
  price: number;
  category: {
    id: string;
    name: string;
  };
}

const ProductsList: FC = () => {
  const [fullProductsArr, setFullProductsArr] = useState<ProductList[]>([]);
  const [productsList, setProductsList] = useState<ProductList[]>([]);
  const [category, setCategory] = useState<string>("");
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => { // show products in table base on category choosed by user
    setProductsList(
      fullProductsArr.filter((product) => product.category.id === category)
    );
  }, [category]);
  
  const fetchData = async () => {
    const responseFromServer = await fetch(
      "http://localhost:3001/api/products"
    );
    const dataTransformed = await responseFromServer.json();
    setProductsList(dataTransformed);
    setFullProductsArr(dataTransformed);
  };
  const sortAscending = () => { // sort products in ascending order based on price
    setProductsList([
      ...productsList.sort(
        (product1, product2) => product1.price - product2.price
      ),
    ]);
  };
  const sortDescending = () => {// sort products in descending order based on price
    setProductsList([
      ...productsList.sort(
        (product1, product2) => product2.price - product1.price
      ),
    ]);
  };
  const productsCategory = fullProductsArr.map( // create an array with all categories disponibles
    (product) => product.category.id
  );
  const uniqueArrayProducts = productsCategory.filter(function (product, pos) { 
    return productsCategory.indexOf(product) === pos;
  });
  const showAllProducts = () => { 
    fetchData();
    setCategory("");
  };
  const cartCtx = useContext(CartContext);
  const addProd = (id: number, name: string, price: number, category: string) => {// function to add element to cart or to increase the amount
    cartCtx.addProduct({
      id: id,
      name: name,
      price: price,
      amount: 1,
      category: category
    });
  };
  const removeProduct = (id: number) => {// function to remove element from cart or to decrease the amount
    cartCtx.removeProduct(id);
  };
  return (
    <section className="mainSec">
      <div className="buttons">
        <button className="button" onClick={sortAscending}>
          Sort ascending
        </button>
        <button className="button" onClick={sortDescending}>
          Sort descending
        </button>
        <div className="dropdown">
          <button className="button">Category</button>
          <div className="dropdown-content">
            <div onClick={showAllProducts}>Show all</div>
            {uniqueArrayProducts.map((prod) => (
              <div key={prod} onClick={() => setCategory(prod)}>
                {prod}
              </div>
            ))}
          </div>
        </div>
      </div>
      <table className="mainTable">
        <tbody>
          {productsList ?
            productsList.map((prod) => (
              <tr key={prod.id}>
                <th>{prod.category.name}</th>
                <th>{prod.name}</th>
                <th>{prod.price}$</th>
                <td>
                  <button
                    onClick={() => addProd(prod.id, prod.name, prod.price, prod.category.name)}
                    className="buttonAdd"
                  >
                    ADD
                  </button>
                  <button
                    className="buttonDelete"
                    onClick={() => removeProduct(prod.id)}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))
          : <p>Server error. Cannot fetch data. Try again later</p>
          }
        </tbody>
      </table>
    </section>
  );
};

export default ProductsList;
