import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { loadUserById } from '../../redux/actions/index';
import UpdateButton from './UpdateButton';
import WelcomeMessage from "../../components/users/WelcomeMessage"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MyAccount = ({loadedUser, error, loadUserById }) => {
  const user = useSelector(state => (state.user))

  useEffect(() => {
    // Carga los datos del usuario cuando el componente se monta
    if (user && user.user.id) {
      loadUserById(user.user.id);
    }
  }, [user, loadUserById]);

  // Manejo de errores
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Renderizar el perfil del usuario si está cargado
  if (loadedUser) {
    return (
      <div className="mx-auto" style={{ width: "40%", margin: "130px",borderRadius: "10px", padding:"30px",  boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.5)"}}>
      <Container>
        <Row>
          <Col>
            <div>
              <h1 style={{fontWeight:700}}>Perfil de Usuario</h1>
              <p>Nombre: {loadedUser.first_name} {loadedUser.last_name}</p>
              <p>Correo electrónico: {loadedUser.email}</p>
              <p>Dirección de envíos: {loadedUser.delivery_address}</p>
              <p>País: {loadedUser.country}</p>
              <p>Teléfono de contacto: {loadedUser.mobile}</p>
              <p>Actividad laboral: {loadedUser.CustomElementRegistry}</p>
              <p>Tipo de cuenta: {loadedUser.role}</p>
              <p>Historial de compras: {loadedUser.purchase_history}</p>
            </div>
            <UpdateButton />
          </Col>
        </Row>
       
      </Container>
            </div>
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
