import React from 'react';
import {Link} from 'react-router-dom';
import imglandp from '../../assets/landing.png';

function Landing() {
  return (
    <div className="bg-dark text-white py-5 min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <img src={imglandp} alt="landing" className="img-fluid" />
          </div>
          <div className="col-lg-6">
            <h1 className="display-4">Mejora tu espacio de trabajo</h1>
            <h1 className="display-4">Las mejores PCs y notebooks del 2023</h1>
            <Link to="/home">
                <button className="btn btn-primary btn-lg mt-3">Compra Ahora</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
