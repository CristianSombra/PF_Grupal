import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCategories, getBrands } from "../../redux/actions";
import CardsContainer from "../../components/cardscontainer/cardscontainer";
import Filter from "../../components/filter/filter";
import SearchResultMessage from "../../components/SearchResultMessage/SearchResultMessage";
import Carrusel from "../../components/banner/banner";

export default function Home() {
  const [listCategories, setListCategories] = useState([]);
  const [listBrands, setListBrands] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const categories = await dispatch(getCategories());
      setTimeout(() => {
        setListCategories(categories);
      }, 1000);
      const brands = await dispatch(getBrands());
      setTimeout(() => {
        setListBrands(brands);
      }, 1000);
    };
    fetchData();
  }, [dispatch]);
  return (
    <div className="container">
      <Carrusel />
      <div className="row">
      <div className="col-md-3 mb-6"> 
          <Filter listCategories={listCategories} listBrands={listBrands} />
        </div>
        <div className="col-md-9">
          <div className="mb-4">
            <SearchResultMessage />
          </div>
          <CardsContainer />
        </div>
      </div>
    </div>
  );
};