import React from 'react';
import { connect } from 'react-redux';

const WelcomeMessage = ({ user }) => {
  // Estilo para las letras blancas
  const whiteText = {
    color: 'white',
  };

  // Verifica si el usuario está autenticado
  if (user) {
    return (
      <div>
        {/* Aplica el estilo al texto */}
        <p style={whiteText}>Bienvenido, {user.user_name}!</p>
      </div>
    );
  } else {
    // Si el usuario no está autenticado, no muestra nada
    return null;
  }
};

const mapStateToProps = (state) => ({
  user: state.user, // Suponiendo que tienes un estado 'user' que contiene los datos del usuario o es null
});

export default connect(mapStateToProps)(WelcomeMessage);
