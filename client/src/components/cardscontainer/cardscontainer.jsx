import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../card/card";
import { sortProductsByPrice } from '../sortingUtils/sortingUtils';
import { getAllProducts } from "../../redux/actions/index";

const CardsContainer = () => {
  const allProducts = useSelector((state) => state.products);
  const orderByPrice = useSelector((state) => state.orderByPrice);
  const searchResults = useSelector((state) => state.searchResults);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  let sortedProducts = [...allProducts];

  if (orderByPrice !== null) {
    sortedProducts = orderByPrice === 'asc'
      ? sortProductsByPrice(sortedProducts, 'asc')
      : sortProductsByPrice(sortedProducts, 'desc');
  }

  if (searchResults.length > 0) {
    sortedProducts = sortedProducts.filter((product) =>
      product.titulo.toLowerCase().includes(searchResults.toLowerCase())
    );
  }

  const columns = [];
  for (let i = 0; i < sortedProducts.length; i += 3) {
    columns.push(sortedProducts.slice(i, i + 3));
  }

  return (
    <div className="container">
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="row">
          {column.map((product) => (
            <div key={product.sku} className="col-md-4">
              <Card
                sku={product.sku}
                name={product.titulo}
                price={product.price}
                image={product.image}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CardsContainer;
