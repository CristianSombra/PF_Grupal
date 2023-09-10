import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/index';

const LogoutButton = ({ user, logout }) => {
  const handleLogout = () => {
    logout();
  };

  // Verifica si el usuario está autenticado antes de mostrar el botón
  if (user) {
    return (
      <button onClick={handleLogout} className="btn btn-primary">
        Cerrar Sesión
      </button>
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
