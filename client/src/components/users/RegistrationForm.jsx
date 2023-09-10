import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../../redux/actions/index';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const RegistrationForm = ({ createUser, user }) => {
  const [formData, setFormData] = useState({
    user_name: '',
    first_name: '',
    last_name: '',
    gender: '',
    email: '',
    delivery_address: '',
    country: '',
    CustomElementRegistry: '',
    mobile: '',
    role: 'Cliente',
    user_password: '',
  });

  // Estados para los errores y mensajes de error
  const [formErrors, setFormErrors] = useState({
    user_name: '',
    first_name: '',
    last_name: '',
    email: '',
  });

  const { user_name, first_name, last_name, gender, email, delivery_address, country, CustomElementRegistry, mobile, role, user_password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Validar campos en tiempo real
    validateField(e.target.name, e.target.value);
  };

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'first_name':
      case 'last_name':
        // Validar solo letras
        if (!/^[A-Za-z]+$/.test(value)) {
          setFormErrors({ ...formErrors, [fieldName]: 'Solo se permiten letras.' });
        } else {
          setFormErrors({ ...formErrors, [fieldName]: '' });
        }
        break;

      case 'email':
        // Validar formato de email
        if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
          setFormErrors({ ...formErrors, email: 'Formato de email incorrecto.' });
        } else {
          setFormErrors({ ...formErrors, email: '' });
        }
        break;

      default:
        setFormErrors({ ...formErrors, [fieldName]: '' });
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Realiza la acción de registro de usuario
    createUser(formData);
  };

  const formIsValid = !Object.values(formErrors).some((error) => error);

  return (
    <div>
      {user ? (
        <div>
          <p>Registro exitoso.</p>
          <Button as={Link} to="/home" variant="dark" size="sm">
            Volver a Home
          </Button>
        </div>
      ) : (
        <div>
          <h2>Registro de Usuario</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre de Usuario:</label>
              <input
                type="text"
                name="user_name"
                value={user_name}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                name="first_name"
                value={first_name}
                onChange={handleChange}
                required
                className="form-control"
              />
              {formErrors.first_name && (
                <span className="text-danger">{formErrors.first_name}</span>
              )}
            </div>
            <div className="form-group">
              <label>Apellido:</label>
              <input
                type="text"
                name="last_name"
                value={last_name}
                onChange={handleChange}
                required
                className="form-control"
              />
              {formErrors.last_name && (
                <span className="text-danger">{formErrors.last_name}</span>
              )}
            </div>
            <div className="form-group">
              <label>Genero:</label>
              <select
                name="gender"
                value={gender}
                onChange={handleChange}
                required
                className="form-control"
              >
                <option value="">Seleccione su género</option>
                <option value="M">M</option>
                <option value="F">F</option>
              </select>
              {formErrors.gender && (
                <span className="text-danger">{formErrors.gender}</span>
              )}
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
                required
                className="form-control"
              />
              {formErrors.email && (
                <span className="text-danger">{formErrors.email}</span>
              )}
            </div>
            <div className="form-group">
              <label>Direccion de envio:</label>
              <input
                type="text"
                name="delivery_address"
                value={delivery_address}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Pais:</label>
              <input
                type="text"
                name="country"
                value={country}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Actividad laboral:</label>
              <input
                type="text"
                name="CustomElementRegistry"
                value={CustomElementRegistry}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Numero de contacto:</label>
              <input
                type="text"
                name="mobile"
                value={mobile}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Rol:</label>
              <input
                type="text"
                name="role"
                value={role}
                readOnly // Esto evita que el usuario modifique el campo "Rol"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Contraseña:</label>
              <input
                type="text"
                name="user_password"
                value={user_password}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <Button
              type="submit"
              disabled={!formIsValid}
              variant="dark"
              size="sm"
            >
              Registrarse
            </Button>
          </form>
        </div>
      )}
    </div>
  );
  
};

const mapStateToProps = (state) => ({
  user: state.user, // Asegúrate de que estás obteniendo User del estado de Redux
});

export default connect(mapStateToProps, { createUser })(RegistrationForm);
