// SearchBar.js
import React from "react";
import SearchBarHandler from "../handlers/SearchBarHandler"; // Importa el componente handler

const SearchBar = () => {
  return (
    <div>
            <SearchBarHandler /> {/* Renderiza el componente handler */}
    </div>
  );
};

export default SearchBar;
