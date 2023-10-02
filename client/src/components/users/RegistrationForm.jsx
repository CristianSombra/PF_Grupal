
import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createUser } from '../../redux/actions/index';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import '../css/index.css';
import Swal from 'sweetalert2';


const RegistrationForm = ({ user }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false);
  const [formValidations, setFormValidations] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    first_name: "",
    last_name: "",
    gender: "",
    email: "",
    delivery_address: "",
    country: "",
    CustomElementRegistry: "",
    mobile: "",
    user_password: "",
  });

  // Estados para los errores y mensajes de error
  const [formErrors, setFormErrors] = useState({
    user_name: "",
    first_name: "",
    last_name: "",
    email: "",
    delivery_address: ""
  });

  const {
    user_name,
    first_name,
    last_name,
    gender,
    email,
    delivery_address,
    country,
    CustomElementRegistry,
    mobile,
    user_password,
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Validar campos en tiempo real
    validateField(e.target.name, e.target.value);
  };

  const validateUsername = (username) => {
    if (username.length > 20) {
      return "Tu nombre de usuario no puede tener más de 20 caracteres";
    }
  
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      return "Tu nombre de usuario solo puede contener letras y números";
    }
  
    if (/\s/.test(username)) {
      return "Tu nombre de usuario no puede contener espacios";
    }
  
    return "";
  };

  const handleUsernameChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  
    const usernameError = validateUsername(value);
    setFormErrors({ ...formErrors, [name]: usernameError });
  };
  

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "first_name":
      case "last_name":
        // Validar solo letras
        if (!/^[A-Za-z]+$/.test(value)) {
          setFormErrors({
            ...formErrors,
            [fieldName]: "Solo se permiten letras.",
          });
        } else {
          setFormErrors({ ...formErrors, [fieldName]: "" });
        }
        break;

      case "email":
        // Validar formato de email
        if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
          setFormErrors({
            ...formErrors,
            email: "Formato de email incorrecto.",
          });
        } else {
          setFormErrors({ ...formErrors, email: "" });
        }
        break;

      default:
        setFormErrors({ ...formErrors, [fieldName]: "" });
        break;
    }
  };


  const handleChangeAddress = (e) => {
    const { name, value } = e.target;
  
    // Validar espacios, caracteres especiales y longitud máxima de 20 caracteres
    if (/^\s/.test(value)) {
      setFormErrors({ ...formErrors, [name]: "No puedes utilizar espacio al principio." });
    } else if (/[^a-zA-Z0-9\s]/.test(value)) {
      setFormErrors({ ...formErrors, [name]: "No puedes utilizar caracteres especiales." });
    } else if (value.length > 20) {
      setFormErrors({ ...formErrors, [name]: "No puede tener más de 20 caracteres." });
    } else {
      setFormErrors({ ...formErrors, [name]: "" });
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleChangeCountry = (e) => {
    const { name, value } = e.target;
  
    // Validar espacios, caracteres especiales y longitud máxima de 20 caracteres
    if (/^\s/.test(value)) {
      setFormErrors({ ...formErrors, [name]: "No puedes utilizar espacio al principio." });
    } else if (/[^a-zA-Z\s]/.test(value)) {
      setFormErrors({ ...formErrors, [name]: "No puedes utilizar números o caracteres especiales." });
    } else if (value.length > 20) {
      setFormErrors({ ...formErrors, [name]: "No puede tener más de 20 caracteres." });
    } else {
      setFormErrors({ ...formErrors, [name]: "" });
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleChangeActivity = (e) => {
    const { name, value } = e.target;
  
    // Validar espacios, caracteres especiales y longitud máxima de 20 caracteres
    if (/^\s/.test(value)) {
      setFormErrors({ ...formErrors, [name]: "No puedes utilizar espacio al principio." });
    } else if (/[^a-zA-Z\s]/.test(value)) {
      setFormErrors({ ...formErrors, [name]: "No puedes utilizar números o caracteres especiales." });
    } else if (value.length > 20) {
      setFormErrors({ ...formErrors, [name]: "No puede tener más de 20 caracteres." });
    } else {
      setFormErrors({ ...formErrors, [name]: "" });
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleChangeNumber = (e) => {
    const { name, value } = e.target;
  
    // Validar números, espacios y caracteres especiales y longitud máxima de 20 caracteres
    if (/^\s/.test(value)) {
      setFormErrors({ ...formErrors, [name]: "No puedes utilizar espacio al principio." });
    } else if (/[^0-9]/.test(value)) {
      setFormErrors({ ...formErrors, [name]: "Solo puedes ingresar números." });
    } else if (value.length > 20) {
      setFormErrors({ ...formErrors, [name]: "No puede tener más de 20 caracteres." });
    } else {
      setFormErrors({ ...formErrors, [name]: "" });
      setFormData({ ...formData, [name]: value });
    }
  };
  
  
  const validatePassword = (password) => {
    if (/\s/.test(password)) {
      return "Tu contraseña no puede contener espacios";
    }
    
    if (password.length > 10) {
      return "Tu contraseña no puede contener más de 10 caracteres";
    }
  
    if (!/^[a-zA-Z0-9]+$/.test(password)) {
      return "Tu contraseña no puede contener caracteres especiales";
    }
  
    return "";
  };
  

  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  
    const passwordError = validatePassword(value);
    setFormErrors({ ...formErrors, [name]: passwordError });
  };
  
  
  
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check for missing fields
    const requiredFields = ['user_name', 'first_name', 'last_name', 'gender', 'email', 'delivery_address', 'country', 'CustomElementRegistry', 'mobile', 'user_password'];
  
    const missingFields = requiredFields.filter((fieldName) => !formData[fieldName]);
  
    if (missingFields.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Fields',
        text: `Please fill in the following fields: ${missingFields.join(', ')}`,
      });
    } else {
      const result = await dispatch(createUser(formData));
      if (result === 'Success') {
        Swal.fire({
          icon: 'success',
          title: 'Registered Successfully, Please Login',
        });
        navigate('/login');
      }
    }
  };

  const formIsValid = !Object.values(formErrors).some((error) => error);

  return (

    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 100px)', marginTop: '130px', marginBottom: '50px' }}>
      {user ? (
        <div>
          <p>Registro exitoso.</p>
          <Button as={Link} to="/home" variant="dark" size="sm">
            Volver a Inicio
          </Button>
        </div>
      ) : (
        <Card style={{ width: '30rem' }} className="custom-shadow">
          <Card.Body>
            <h2>Registro de Usuario</h2>
            <Form onSubmit={handleSubmit}>
            <Form.Group>
                  <Form.Label>Nombre de usuario:</Form.Label>
                  <div className="username-input-container">
                    <Form.Control
                      type="text"
                      name="user_name"
                      value={user_name}
                      onChange={handleUsernameChange}
                      required
                    />
                  </div>
                  {formErrors.user_name && (
                    <Form.Text className="text-danger">{formErrors.user_name}</Form.Text>
                  )}
                </Form.Group>
              <Form.Group>
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  value={first_name}
                  onChange={handleChange}
                  required
                />
                {formErrors.first_name && (
                  <Form.Text className="text-danger">{formErrors.first_name}</Form.Text>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Apellido:</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  value={last_name}
                  onChange={handleChange}
                  required
                />
                {formErrors.last_name && (
                  <Form.Text className="text-danger">{formErrors.last_name}</Form.Text>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Género:</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione su género</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                  <option value="I">Prefiero no responder</option>
                </Form.Control>
                {formErrors.gender && (
                  <Form.Text className="text-danger">{formErrors.gender}</Form.Text>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Correo electrónico:</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                />
                {formErrors.email && (
                  <Form.Text className="text-danger">{formErrors.email}</Form.Text>
                )}
              </Form.Group>
              <Form.Group>
                  <Form.Label>Dirección:</Form.Label>
                  <Form.Control
                    type="text"
                    name="delivery_address"
                    value={delivery_address}
                    onChange={handleChangeAddress}
                    required
                  />
                  {formErrors.delivery_address && (
                    <Form.Text className="text-danger">{formErrors.delivery_address}</Form.Text>
                  )}
                </Form.Group>
              <Form.Group>
                <Form.Label>País:</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={country}
                  onChange={handleChangeCountry}
                  required
                />
                {formErrors.country && (
                   <Form.Text className="text-danger">{formErrors.country}</Form.Text>
                  )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Actividad laboral:</Form.Label>
                <Form.Control
                  type="text"
                  name="CustomElementRegistry"
                  value={CustomElementRegistry}
                  onChange={handleChangeActivity}
                  required
                />
                  {formErrors.CustomElementRegistry && (
                    <Form.Text className="text-danger">{formErrors.CustomElementRegistry}</Form.Text>
                  )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Número de contacto:</Form.Label>
                <Form.Control
                  type="text"
                  name="mobile"
                  value={mobile}
                  onChange={handleChangeNumber}
                  required
                />
                  {formErrors.mobile && (
                       <Form.Text className="text-danger">{formErrors.mobile}</Form.Text>
                     )}
              </Form.Group>
              <Form.Group>
                  <Form.Label>Contraseña:</Form.Label>
                  <div className="password-input-container">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="user_password"
                      value={user_password}
                      onChange={handleChangePassword}
                      required
                    />
                    <i
                      className={`password-toggle-icon bi ${
                        showPassword ? "bi-eye-slash" : "bi-eye"
                      } eye-icon`}
                      onClick={togglePasswordVisibility}
                    ></i>
                  </div>
                  {formErrors.user_password && (
                    <p className="text-danger">{formErrors.user_password}</p>
                  )}
                </Form.Group>
              <div className="text-center">
                <Button
                  type="submit"
                  disabled={!formIsValid}
                  variant="dark"
                  size="sm"
                  className='mt-4'
                >
                  Registrarse
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
  user: state.user, // Asegúrate de que estás obteniendo User del estado de Redux
});

export default connect(mapStateToProps, { createUser })(RegistrationForm);