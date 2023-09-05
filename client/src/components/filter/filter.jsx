import React, { useState } from "react";
import { useDispatch,  } from "react-redux";
import {
  getAllProducts,
 
  resetFilters,
  getProductFilter,
} from "../../redux/actions/index";
import Swal from "sweetalert2";
import styles from "../filter/filter.module.css";

const Filter = ({ listCategories, listBrands }) => {
  const dispatch = useDispatch();
  const brands = listBrands;
  const categories = listCategories;

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const applyFilters = async () => {
    const productsFilter = await dispatch(
      getProductFilter(selectedBrand, selectedCategory)
    );
    console.log(productsFilter);
    if (!productsFilter) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No hay productos con ese filtro.",
      });
    }
  };

  const reset = () => {
    setSelectedBrand("");
    setSelectedCategory("");
    dispatch(resetFilters());
    dispatch(getAllProducts());
  };

  return (
    <div className={styles['filter-container']}>
    <div>
    <label htmlFor="brandSelect">
        Filtrar por Marca:
      </label>
        <select
          id="brandSelect"
          value={selectedBrand}
          onChange={handleBrandChange}
          className={styles['select-dropdown']}

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
          className={styles['select-dropdown']}

        >
          <option value="">Todas las Categorías</option>
          {categories.map((category) => (
            <option key={category.id_category} value={category.id_category}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles['button-container']}>
      <button className={styles.button} onClick={applyFilters}>
        Aplicar Filtros
      </button>
      <button className={`${styles.button} ${styles['reset-button']}`} onClick={reset}>
        Resetear Filtros
      </button>
    </div>
  </div>
);
};

export default Filter;
