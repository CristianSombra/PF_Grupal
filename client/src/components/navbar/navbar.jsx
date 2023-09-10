import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import SearchBar from "../searchbar/searchbar";
import Navbar from 'react-bootstrap/Navbar';
import LoginButton from "../users/loginButton"
import WelcomeMessage from "../../components/users/WelcomeMessage"
import LogoutButton from "../users/LogoutButton"
import ButtonAccount from "../users/ButtonAccount"
import RegisterButton from "../users/RegisterButton"


const Navbar1 = () => {
  const [isSticky, setIsSticky] = useState(false);
 
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);



  return (
    <Navbar bg="dark" data-bs-theme="dark" className="navbar-expand-sm d-flex justify-content-center rounded">
      <WelcomeMessage/>
      <Button as={Link} to="/home" variant="dark" size="sm" className="me-2">Inicio</Button>
      <Button as={Link} to="/createProduct" variant="dark" size="sm" className="me-2">Crear producto</Button>
      <SearchBar />
      <RegisterButton/>
      <LoginButton/>
      <Button as={Link} to="/" variant="dark" size="sm">Cambiar de Pais</Button>
      <ButtonAccount/>
      <LogoutButton/>
    </Navbar>
  );
};

export default Navbar1;
