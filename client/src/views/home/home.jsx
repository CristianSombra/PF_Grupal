import React from "react";
import CardsContainer from "../../components/cardscontainer/cardscontainer";
import styles from "./home.module.css";
import banner from "../../assets/banner.png";
import SortDivs from "../../components/SortDivs/SortDivs"
import { useDispatch } from "react-redux";
import { getCategories, getBrands } from "../../redux/actions";


export default function Home() {

  return (
    <div className={styles.homeContainer}>
      <img src={banner} alt="Fondo" className={styles.banner} />
      <SortDivs />
      <div className={styles.filterContainer}>
        <Filter listCategories={listCategories} listBrands={listBrands} />
      </div>
      <div className={styles.cardContainer}>  
       <CardsContainer />

      </div>
    </div>
  );
}
