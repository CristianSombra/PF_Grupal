import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CardsContainer from "../../components/cardscontainer/cardscontainer";
import styles from './home.module.css';
import banner from "../../assets/banner.png";

export default function Home() {

  useEffect(() => {
  }, []);

  return (
    <div className={styles.homeContainer}>
      <img src={banner} alt="Fondo" className={styles.banner} />
      <Link className={styles.linkButton} to="/">Salir</Link>
      <div className={styles.cardContainer}>
        <CardsContainer />
      </div>
    </div>
  );
}