import React, { useEffect, useState } from "react";
import CardsContainer from "../../components/cardscontainer/cardscontainer";
import Filter from "../../components/filter/filter";
import styles from "./home.module.css";
import banner from "../../assets/banner.png";
import { useDispatch } from "react-redux";
import { getCategories, getBrands } from "../../redux/actions";

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
    <div className={styles.homeContainer}>
      <img src={banner} alt="Fondo" className={styles.banner} />
      <div className={styles.filterContainer}>
        <Filter listCategories={listCategories} listBrands={listBrands} />
      </div>
      <div className={styles.cardContainer}>
        <CardsContainer />
      </div>
    </div>
  );
}
