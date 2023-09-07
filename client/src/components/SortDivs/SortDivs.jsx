import React from 'react';
import SortByPriceHandler from '../handlers/handlerSortByPrice';
import SearchResultMessage from "../SearchResultMessage/SearchResultMessage"


const SortDivs= () => {
  return (
    <div>
      
     <SortByPriceHandler />
     <SearchResultMessage />
     
    </div>
  );
};

export default SortDivs;
