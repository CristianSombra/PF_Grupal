import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/index';
import { Button } from 'react-bootstrap';

const LogoutButton = ({ user, logout }) => {
  const handleLogout = () => {
    logout();
  };

  // Verifica si el usuario está autenticado antes de mostrar el botón
  if (user) {
    return (
      <Button onClick={handleLogout} variant="dark" size="sm">Cerrar Secion</Button>
      
    );
  } else {
    // Si el usuario es null, no muestra nada
    return null;
  }
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { logout })(LogoutButton);
