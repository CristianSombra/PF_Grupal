import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateUserInfo } from '../../redux/actions/index';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';

const UpdateAccount = ({ userId, updateUserInfo }) => {
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);

  const handleUpdate = async () => {
    try {
      await updateUserInfo(userId, newPassword);
      alert('Contraseña actualizada correctamente.');
      // Aquí puedes redirigir al usuario a donde desees, por ejemplo, la página de su cuenta.
    } catch (err) {
      setError(err.response?.data?.error || 'Error al actualizar la contraseña.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 100px)', marginTop: '70px', marginBottom: '30px' }} >
    <Row>
      <Col>
          <h3 className="text-center">Ingresa tu nueva contraseña</h3>
          {error && <div className="text-danger text-center mb-3">{error}</div>}
          <Form>
            <Form.Group>
              <Form.Label>Nueva Contraseña:</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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

const mapDispatchToProps = (dispatch) => ({
  updateUserInfo: (userId, newPassword) =>
    dispatch(updateUserInfo(userId, newPassword)),
});

export default connect(null, mapDispatchToProps)(UpdateAccount);
