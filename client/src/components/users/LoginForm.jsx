
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/index';
import { Link } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import '../css/index.css';

const LoginForm = ({ login, user, error }) => {
  const [formData, setFormData] = useState({
    email: "",
    user_password: "",
  });

  const { email, user_password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Llamar a la acción de inicio de sesión
    await login(formData);
  };

  return (

    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 100px)', marginTop: '70px', marginBottom: '30px' }}>
      {user ? (
        <div>
          <p>Inicio de sesión exitoso.</p>
          <Button as={Link} to="/home" variant="dark" size="sm">
            Volver a Home
          </Button>
        </div>
      ) : (
        <Card style={{ width: '30rem' }} className="custom-shadow">
          <Card.Body>
            <h2>Iniciar Sesión</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required

                />
                <Form.Text id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="user_password"
                  value={user_password}
                  onChange={handleChange}
                  required

                />
              </Form.Group>
              <Form.Group className="mb-3 form-check">
                <Form.Check type="checkbox" id="exampleCheck1" />
                <Form.Label className="form-check-label" htmlFor="exampleCheck1">
                  Check me out
                </Form.Label>
              </Form.Group>
              <div className="text-center"> {/* Agrega esta div y la clase text-center */}
                <Button type="submit" variant="dark" size="sm">
                  Iniciar Sesión
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  error: state.error,
});

export default connect(mapStateToProps, { login })(LoginForm);
