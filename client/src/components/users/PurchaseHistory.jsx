import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUserById } from '../../redux/actions/index';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PurchageHistori = ({ user, loadedUser, error, loadUserById }) => {
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
  if (loadedUser.purchase_history) {
    const purchaseHistory = loadedUser.purchase_history;

    if (purchaseHistory.length === 0) {
      return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 100px)', marginTop: '70px', marginBottom: '30px' }}>
          <Row>
            <Col>
              <div>
                <p>No hay compras registradas.</p>
              </div>
            
            </Col>
          </Row>
        </Container>
      );
    }

    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 100px)', marginTop: '70px', marginBottom: '30px' }}>
        <Row>
          <Col>
            <div>
              <h3>Historial De compras</h3>
              <ul>
                {purchaseHistory.map((purchase, index) => (
                  <li key={index}>Compra {index + 1}: {purchase}</li>
                ))}
              </ul>
            </div>
           
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

export default connect(mapStateToProps, mapDispatchToProps)(PurchageHistori);
