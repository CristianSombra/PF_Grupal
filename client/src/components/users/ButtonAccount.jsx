import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

const ButtonAccount = ({ user }) => {
  if (user) {
    // Si el usuario está autenticado, muestra el botón de la cuenta
    return (

      <Button as={Link} to="/account" variant="dark" size="sm">Mi Cuenta</Button>
      
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
