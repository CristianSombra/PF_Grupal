import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Button, Dropdown } from "react-bootstrap";
import SearchBar from "../searchbar/searchbar";
import Navbar from 'react-bootstrap/Navbar';
import LoginButton from "../users/loginButton"
import WelcomeMessage from "../../components/users/WelcomeMessage"
import LogoutButton from "../users/LogoutButton"
import ButtonAccount from "../users/ButtonAccount"
import RegisterButton from "../users/RegisterButton"
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png'
import './navbar.css'


const Navbar1 = ({user}) => {
  const [loggedIn, setLoggedIn] = useState(!!user);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  useEffect(() => {
    setLoggedIn(!!user);
  }, [user]);


  return (
    <Navbar bg="dark" data-bs-theme="dark" className="navbar-expand-sm d-flex justify-content-between rounded align-items-center fixed-top custom-navbar">
      <div className="d-flex align-items-center">
        <img src={logo} alt="Logo" className="logo custom-logo" />
        <Button as={Link} to="/home" variant="dark" size="sm" style={{ fontSize: '1.2rem' }}>Inicio</Button>
        <Button as={Link} to="/createProduct" variant="dark" size="sm" style={{ fontSize: '1.2rem' }}>Crear producto</Button>
      </div>
      <SearchBar />
      <Button as={Link} to="/cart" variant="dark" size="sm" className="me-3 custom-button">
        <i className="bi bi-cart" style={{ fontSize: '2.3rem' }}></i>
      </Button>
      {loggedIn ? (
        <Dropdown>
          <Dropdown.Toggle variant="dark" size="sm" className="me-3 custom-button">
            <FontAwesomeIcon icon={faUser} style={{ fontSize: '2rem' }}/>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <WelcomeMessage />
              <ButtonAccount />
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setLoggedIn(false)}>
              <LogoutButton />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Dropdown>
          <Dropdown.Toggle variant="dark" size="sm" className="me-3 custom-button">
            <FontAwesomeIcon icon={faUser} style={{ fontSize: '2rem' }}/>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <LoginButton onClick={handleLogin} /> 
            </Dropdown.Item>
            <Dropdown.Item>
              <RegisterButton /> 
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
      <Button as={Link} to="/" variant="dark" size="sm" className="me-3 custom-button">
        <i className="bi bi-power" style={{ fontSize: '2.3rem' }}></i>
      </Button>
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Navbar1);