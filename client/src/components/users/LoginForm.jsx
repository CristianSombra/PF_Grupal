import React, { useState } from "react";
import { connect } from "react-redux";
import { login } from "../../redux/actions/index";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

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
    <div style={{ marginTop: "100px" }}>
      <div>
        {user ? (
          <div>
            <p>Inicio de sesión exitoso.</p>
            <Button as={Link} to="/home" variant="dark" size="sm">
              Volver a inicio
            </Button>
          </div>
        ) : (
          <>
            <h2>Iniciar Sesión</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Dirección de correo
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                <div id="emailHelp" className="form-text">
                Nunca compartiremos su correo electrónico con nadie.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="user_password"
                  value={user_password}
                  onChange={handleChange}
                  required
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Check me out
                </label>
              </div>
              <Button type="submit" variant="dark" size="sm">
                Iniciar sesión
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  error: state.error,
});

export default connect(mapStateToProps, { login })(LoginForm);
