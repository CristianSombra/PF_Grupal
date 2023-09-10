import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link de React Router
import { connect } from 'react-redux'; // Importa connect para acceder al estado de autenticación

const LoginButton = ({ user }) => {
  // Comprueba si el usuario está autenticado
  if (user) {
    return null; // Si el usuario está autenticado, no muestra nada
  } else {
    return (
      <Link to="/login">
        <button className="btn btn-primary">Ingresar</button>
      </Link>
    );
  }
};

const mapStateToProps = (state) => ({
  user: state.user, // Suponiendo que tienes un estado 'user' que contiene los datos del usuario o es null
});

export default connect(mapStateToProps)(LoginButton);
