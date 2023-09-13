import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const RatingsButton = ({ user }) => {
  // Comprueba si el usuario está autenticado
  if (user) {
    return null; // Si el usuario está autenticado, no muestra nada
  } else {
    return (
      <Link to="/login">
        <Button variant="dark" size="sm">Calissssssficar</Button>
      </Link>
    );
  }
};

export default RatingsButton;
