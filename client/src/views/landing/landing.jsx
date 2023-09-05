import React from 'react';
import {Link} from 'react-router-dom';
import styles from './landing.module.css';
import imglandp from '../../assets/landing.png';


function Landing() {
  return (
    <div className={styles.background}>
      <div className={styles.text}>
        <h1>Mejora tu espacio de trabajo</h1>
        <h1>Las mejores PCs y notebooks del 2023 </h1>
      <Link to="/home">
      <button className={styles.button}>Compra Ahora</button>
      </Link>
      </div>
      <div className={styles.image}>
        <img src={imglandp} alt="landing" />
      </div>
    </div>
  );
}

export default Landing;