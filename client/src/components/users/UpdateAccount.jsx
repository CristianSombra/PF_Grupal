import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateUserInfo } from '../../redux/actions/index';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';

const UpdateAccount = ({ updateUserInfo, userId }) => {
  const [user_password, setuser_password] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleUpdate = async () => {
    try {
      await updateUserInfo(userId, { user_password: user_password });
      setSuccess('Contraseña actualizada correctamente.');
      setError(null);
      // Puedes redirigir al usuario a donde desees, por ejemplo, la página de su cuenta.
    } catch (err) {
      setError('Error al actualizar la contraseña. Por favor, inténtelo de nuevo.');
      setSuccess(null);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 100px)', marginTop: '70px', marginBottom: '30px' }} >
      <Row>
        <Col>
          <h3 className="text-center">Ingresa tu nueva contraseña</h3>
          {error && <div className="text-danger text-center mb-3">{error}</div>}
          {success && <div className="text-success text-center mb-3">{success}</div>}
          <Form>
            <Form.Group>
              <Form.Label>Nueva Contraseña:</Form.Label>
              <Form.Control
                type="password"
                value={user_password}
                onChange={(e) => setuser_password(e.target.value)}
              />
            </Form.Group>
            <div className="text-center">
              <Button onClick={handleUpdate} variant="dark" size="sm">
                Actualizar
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  userId: state.user.id,
});

const mapDispatchToProps = (dispatch) => ({
  updateUserInfo: (id, user_password) =>
    dispatch(updateUserInfo(id, user_password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAccount);
