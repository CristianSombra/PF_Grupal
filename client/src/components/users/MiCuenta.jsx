import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUserById } from '../../redux/actions/index';
import UpdateButton from './UpdateButton';
import WelcomeMessage from "../../components/users/WelcomeMessage"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MyAccount = ({ user, loadedUser, error, loadUserById }) => {
  useEffect(() => {
    // Carga los datos del usuario cuando el componente se monta
    if (user && user.id) {
      loadUserById(user.id);
    }
  }, [user, loadUserById]);

  // Manejo de errores
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Renderizar el perfil del usuario si está cargado
  if (loadedUser) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 100px)', marginTop: '70px', marginBottom: '30px' }} >
        <Row>
          <Col>
            <div >
              <WelcomeMessage/>
              <p></p>
              <p><strong>Nombre:</strong> {loadedUser.first_name} {loadedUser.last_name}</p>
              <p><strong>Correo electrónico:</strong> {loadedUser.email}</p>
              <p><strong>Dirección de envíos:</strong> {loadedUser.delivery_address}</p>
              <p><strong>País:</strong> {loadedUser.country}</p>
              <p><strong>Teléfono de contacto:</strong> {loadedUser.mobile}</p>
              <p><strong>Actividad laboral:</strong> {loadedUser.CustomElementRegistry}</p>
              <p><strong>Tipo de cuenta:</strong> {loadedUser.role}</p>
            </div>
            <UpdateButton />
          </Col>
        </Row>
       
      </Container>
    );
  }

  // El usuario todavía se está cargando, puedes mostrar un indicador de carga
  return <div className="mt-4">Cargando...</div>;
};

const mapStateToProps = (state) => ({
  user: state.user, // Obtén el objeto de usuario del estado global
  loadedUser: state.loadedUser,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({
  loadUserById: (userId) => dispatch(loadUserById(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
