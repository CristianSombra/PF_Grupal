import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/index';
import { Link , } from 'react-router-dom';

const LoginForm = ({ login, user, error }) => {
  const [formData, setFormData] = useState({
    email: '',
    user_password: '',
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
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            name="user_password"
            value={user_password}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Iniciar Sesión
        </button>
      </form>
      {user ? (
        <div>
          <p>Inicio de sesión exitoso.</p>
          <Link to="/home">Ir a la página de inicio</Link>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  error: state.error,
});

export default connect(mapStateToProps, { login })(LoginForm);
