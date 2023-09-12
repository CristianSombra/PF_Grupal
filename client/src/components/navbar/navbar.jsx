import React from "react";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from '../../assets/logo.png'
import './navbar.css'
import SearchBar from "../searchbar/searchbar";
import Navbar from 'react-bootstrap/Navbar';
import LoginButton from "../users/loginButton"
import LogoutButton from "../users/LogoutButton"
import ButtonAccount from "../users/ButtonAccount"
import RegisterButton from "../users/RegisterButton"


const Navbar1 = () => {

  return (
    <Navbar bg="dark" data-bs-theme="dark" className="navbar-expand-sm d-flex justify-content-between rounded align-items-center fixed-top custom-navbar">
      <div className="d-flex align-items-center">
      <img src={logo} alt="Logo" className="logo custom-logo" />
    
      <Button as={Link} to="/home" variant="dark" size="sm" style={{ fontSize: '1.2rem' }}>Inicio</Button>
      <Button as={Link} to="/createProduct" variant="dark" size="sm" style={{ fontSize: '1.2rem' }}>Crear producto</Button>
      </div>
      <SearchBar />
      <RegisterButton/>
      <LoginButton/>
      <Button as={Link} to="/" variant="dark" size="sm" className="me-3 custom-button">
        <i className="bi bi-power" style={{ fontSize: '2.3rem' }}></i>
      </Button>
      <ButtonAccount/>
      <LogoutButton/>
    </Navbar>
  );
};

export default Navbar1;
