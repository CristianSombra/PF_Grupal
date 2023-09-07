import React from "react";
import CardsContainer from "../../components/cardscontainer/cardscontainer";
import styles from "./home.module.css";
import banner from "../../assets/banner.png";


export default function Home() {

  return (
    <div className={styles.homeContainer}>
      <img src={banner} alt="Fondo" className={styles.banner} />
      <div className={styles.cardContainer}>
        <CardsContainer />
      </div>
    </div>
  );
}
