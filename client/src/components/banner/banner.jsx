import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Banner2 from '../../assets/banners/banner-n02.jpg'
import Banner3 from '../../assets/banners/banner-n03.jpg'
import Banner4 from '../../assets/banners/banner-n04.jpg'

function Carrusel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img src={Banner2} alt="Slide 1" className="d-block w-100 h-50 mx-auto" />
        <Carousel.Caption>
          <h3>Primer foto</h3>
          <p>Texto primer foto.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={Banner3} alt="Slide 2" className="d-block w-100 h-50 mx-auto" />
        <Carousel.Caption>
          <h3>Segunda foto</h3>
          <p>Texto segunda foto.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={Banner4} alt="Slide 3" className="d-block w-100 h-50 mx-auto" />
        <Carousel.Caption>
          <h3>Tercer foto</h3>
          <p>Texto tercer foto.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carrusel;
