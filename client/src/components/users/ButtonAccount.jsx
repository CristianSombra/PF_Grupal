import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import LogoutButton from './LogoutButton'; // Importa el componente LogoutButton

const ButtonAccount = ({ user }) => {
  if (user) {
    // Si el usuario está autenticado, muestra el botón de la cuenta
    return (
      <Dropdown>
        <Dropdown.Toggle variant="dark" size="sm" id="account-dropdown">
        {user.user_name}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/account">Mi Perfil</Dropdown.Item>
          <Dropdown.Item as={Link} to="/purchases">Mis Compras</Dropdown.Item>
          <Dropdown.Item as={Link} to="/wishlist">Lista de Deseos</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            {/* Agrega el componente LogoutButton aquí */}
            <LogoutButton />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
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
