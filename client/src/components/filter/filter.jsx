import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  filterByBrand,
  filterByCategory,
  resetFilters,
} from "../../redux/actions/index";
import styles from "../filter/filter.module.css";

const Filter = ({ listCategories, listBrands }) => {
  const dispatch = useDispatch();
  const brands = listBrands;
  const categories = listCategories;

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
    setSelectedCategory('Todas las Categorías')
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedBrand('Todas las Marcas')
  };

  const applyFilters = () => {
    if (selectedBrand) {
      dispatch(filterByBrand(selectedBrand));
    }
    if (selectedCategory) {
      dispatch(filterByCategory(selectedCategory));
    }
  };

  const reset = () => {
    setSelectedBrand("");
    setSelectedCategory("");
    dispatch(resetFilters());
    dispatch(getAllProducts());
  };

  return (
    <div>
      <div>
        <label htmlFor="brandSelect">Filtrar por Marca:</label>
        <select
          id="brandSelect"
          value={selectedBrand}
          onChange={handleBrandChange}
        >
          <option value="">Todas las Marcas</option>
          {brands.map((brand) => (
            <option key={brand.id_brand} value={brand.id_brand}>
              {brand.brand_name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="categorySelect">Filtrar por Categoría:</label>
        <select
          id="categorySelect"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Todas las Categorías</option>
          {categories.map((category) => (
            <option key={category.id_category} value={category.id_category}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button onClick={applyFilters}>Aplicar Filtros</button>
        <button onClick={reset}>Resetear Filtros</button>
      </div>
    </div>
  );
};

export default Filter;
