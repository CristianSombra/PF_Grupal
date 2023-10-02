import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import imglandp from "../../assets/landing.png";

function Landing() {
  const [activeElements, setActiveElements] = useState([]);

  useEffect(() => {
    // Agrega la clase `active` a los elementos que queremos animar
    const fadeIns = document.querySelectorAll(".fade-in");
    fadeIns.forEach((element) => {
      element.classList.add("active");
    });

    // Actualiza el estado del componente para que los elementos se mantengan animados
    setActiveElements(fadeIns);
  }, []);

  return (
    <div className="bg-dark text-white py-5">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-lg-6 col-12 text-center">
            <img
              src={imglandp}
              alt="landing"
              className="img-fluid rotate-360-cont zoomIn"
              style={{
                width: "650px",
                height: "auto",
              }}
            />
          </div>
          <div className="col-lg-6 col-12">
            {/* <h1 className="display-4 zoomIn">
              Descubre un mundo de posibilidades
            </h1>
            <h1 className="display-4 zoomIn">experimentando la diferencia.</h1> */}
            <h1 className="display-4 zoomIn">Potencia tu rendimiento</h1>
            <h1 className="display-4 zoomIn">
              Con las mejores laptops del mercado.
            </h1>
            <div className="d-flex justify-content-center">
              <Link to="/home">
                <button
                  className="btn btn-primary btn-lg mt-3 zoomIn"
                >
                  Explorar nuestra tienda
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;