import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "./navbar.module.css";

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
      <div>
        <Link to="/home">Inicio</Link>
        <Link to="/">Salir</Link>
      </div>
    </div>
  );
};

export default Navbar;