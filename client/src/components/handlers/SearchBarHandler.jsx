import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSearchResults } from "../../redux/actions/index";

const SearchBarHandler = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    // Dispatch la acción para buscar productos con la consulta ingresada
    dispatch(updateSearchResults(searchQuery));

    // Limpia el campo de búsqueda estableciendo el estado a una cadena vacía
    setSearchQuery("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button onClick={handleSearchSubmit}>Buscar</button>
    </div>
  );
};

export default SearchBarHandler;
