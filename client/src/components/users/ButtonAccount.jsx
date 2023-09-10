import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const ButtonAccount = ({ user }) => {
  if (user) {
    // Si el usuario está autenticado, muestra el botón de la cuenta
    return (
      <Link to="/account">
        <button>Mi Cuenta</button>
      </Link>
    );
  } else {
    // Si el usuario no está autenticado, no muestra nada
    return null;
  }
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(ButtonAccount);
