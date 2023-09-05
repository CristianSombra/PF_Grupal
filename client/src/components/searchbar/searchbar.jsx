import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/actions/index';

const SearchBar = () => {
  // Estados locales para el término de búsqueda, seguimiento de búsqueda realizada y estado de búsqueda activa
  const [searchTerm, setSearchTerm] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Acceder al estado global de productos y el despachador de acciones
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);

  // Estado local para el texto del botón de búsqueda
  const [buttonText, setButtonText] = useState('Buscar');

  // Efecto para cargar todos los productos al montar el componente
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Función para realizar la búsqueda
  const handleSearch = () => {
    // Verificar si el término de búsqueda está vacío
    if (searchTerm.trim() === '') {
      return;
    }

    // Marcar que se ha realizado una búsqueda
    setHasSearched(true);
    setIsSearchActive(true);

    // Filtrar los productos según el término de búsqueda
    const filteredProducts = searchTerm
      ? products.filter(product =>
          product.titulo.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : products;

    // Despachar la acción para filtrar los productos
    dispatch({ type: 'FILTER_PRODUCTS', payload: searchTerm ? filteredProducts : products });

    // Cambiar el texto del botón a "Borrar Búsqueda"
    setButtonText('Borrar Búsqueda');

    // Verificar si no se encontraron coincidencias en la búsqueda
    if (filteredProducts.length === 0) {
      alert('No se encontraron coincidencias en la búsqueda.');

      // Restablecer el término de búsqueda al hacer clic en el alert
      setSearchTerm('');
      setButtonText('Buscar');
    }
  };

  // Función para manejar el cambio en el campo de entrada
  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setSearchTerm(inputText);
  };

  // Función para borrar la búsqueda actual
  const handleClearSearch = () => {
    setSearchTerm('');
    setIsSearchActive(false);

    // Despachar la acción para restablecer los productos a su estado original
    dispatch({ type: 'FILTER_PRODUCTS', payload: products });

    // Cambiar el texto del botón a "Buscar"
    setButtonText('Buscar');
  };

  // Función para manejar la tecla "Enter" en el campo de entrada
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (isSearchActive) {
        handleClearSearch();
      } else {
        handleSearch();
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Ingrese el producto..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        list="product-list"
      />

      <datalist id="product-list">
        {products.map(product => (
          <option key={product.id} value={product.titulo} />
        ))}
      </datalist>

      <button onClick={isSearchActive ? handleClearSearch : handleSearch}>{buttonText}</button>

      {hasSearched && !searchTerm && (
        <p>No se ha ingresado un término de búsqueda. Mostrando todos los productos:</p>
      )}
    </div>
  );
};

export default SearchBar;
