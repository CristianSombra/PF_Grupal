import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const RegisterButton = ({ user }) => {
  // Comprueba si el usuario está autenticado
  if (!user) {
    return (
      <Link to="/registration">
        <button className="btn btn-primary">Registrarse</button>
      </Link>
    );
  } else {
    return null; // Si el usuario está autenticado, no muestra nada
  }
};

const mapStateToProps = (state) => ({
  user: state.user, // Suponiendo que tienes un estado 'user' que contiene los datos del usuario o es null
});

export default connect(mapStateToProps)(RegisterButton);
