import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const SearchResultMessage = () => {
  const searchResults = useSelector((state) => state.searchResults);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Actualiza el estado de búsqueda cuando cambian los resultados de búsqueda
    setSearchQuery(searchResults);
  }, [searchResults]);

  // Verifica si el usuario ha realizado una búsqueda
  const hasSearchQuery = searchQuery.length > 0;

  return (
    <div>
      {hasSearchQuery && (
        <div>
          Resultado de búsqueda para: <strong>{searchQuery}</strong>
        </div>
      )}
    </div>
  );
};

export default SearchResultMessage;
