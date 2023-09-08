import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetFilters, getProductFilter } from "../../redux/actions/index";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SortDivs from "../../components/SortDivs/SortDivs";

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
    setSelectedBrand(""); // Restablece la selección de marca
    setSelectedCategory(""); // Restablece la selección de categoría
    dispatch(resetFilters()); // Llama a la acción para restablecer otros filtros
  };

  return (
    <div className="container">
      <Form>
        <Form.Group>
          <Form.Label>Filtrar por Marca:</Form.Label>
          <Form.Select
            value={selectedBrand}
            onChange={handleBrandChange}
          >
            <option value="">Todas las Marcas</option>
            {brands.map((brand) => (
              <option key={brand.id_brand} value={brand.id_brand}>
                {brand.brand_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Filtrar por Categoría:</Form.Label>
          <Form.Select
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Todas las Categorías</option>
            {categories.map((category) => (
              <option key={category.id_category} value={category.id_category}>
                {category.category_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <div className="d-grid gap-3">
          <Button variant="dark" onClick={applyFilters}>
            Aplicar Filtros
          </Button>
          <Button variant="dark" onClick={reset}>
            Resetear Filtros
          </Button>
        </div>
      </Form>
      <SortDivs />
    </div>
  );
};

export default Filter;
