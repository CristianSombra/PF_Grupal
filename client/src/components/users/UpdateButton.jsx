import React from 'react';
import { Link } from 'react-router-dom';

const UpdateButton = () => {
  return (
    <Link to="/updateaccount">
      <button>Actualizar Datos</button>
    </Link>
  );
};

export default UpdateButton;