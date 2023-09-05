import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import SearchBar from '../searchbar/searchbar'
import SortByPrice from '../SortByPrice/SortByPrice';

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`${styles.navbar} ${isSticky ? styles.sticky : ""}`}>
      <div className={styles.navLinks}>
        <Link to="/home">Inicio</Link>
        <Link to="/createProduct">Crear producto</Link>
      </div>
      <div className={styles.logoutButton}>
        <Link to="/">Salir</Link>
        <Link to="/createProduct">Crear producto</Link>
      </div>
      
      <SortByPrice className={styles.sortbyprice} /> {/* Agrega la clase de estilo al componente SortByPrice */}
      <SearchBar className={styles.searchbar} /> {/* Agrega la clase de estilo al componente SearchBar */}

    </div>
  );
};

export default Navbar;
