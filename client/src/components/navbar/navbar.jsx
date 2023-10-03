import React from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Dropdown } from "react-bootstrap";
// import SearchBar from "../searchbar/searchbar";
import Navbar from "react-bootstrap/Navbar";
import LoginButton from "../users/loginButton";
import WelcomeMessage from "../../components/users/WelcomeMessage";
import LogoutButton from "../users/LogoutButton";
import RegisterButton from "../users/RegisterButton";
import "bootstrap-icons/font/bootstrap-icons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.png";
import "./navbar.css";

const Navbar1 = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const cartProd = useSelector((state) => state.cartItems);
  const wishlist = useSelector((state) => state.wishlist);
  const user = useSelector((state) => state.user);
  const role = user?.user.role;

  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      className="navbar-expand-sm d-flex justify-content-between align-items-center fixed-top custom-navbar"
    >
      <div className="d-flex align-items-center">
        <Link to="/home" className="logo custom-logo">
          <img
            src={logo}
            alt="Logo"
            style={{ width: "30%", marginRight: "10%", marginLeft: "30%" }}
          />
        </Link>
      </div>
      {/* <SearchBar /> */}
      <Button
        as={Link}
        to="/cart"
        variant="dark"
        size="sm"
        className="me-3 mt-3"
      >
        <i className="bi bi-cart" style={{ fontSize: "2.3rem" }}>
          {" "}
          {cartProd.length > 0 && (
            <span className="cartCount">{cartProd.length}</span>
          )}
        </i>
      </Button>
      <Button
        as={Link}
        to="/wishlist"
        variant="dark"
        size="sm"
        className="me-3 mt-3"
      >
        <i className="bi bi-heart" style={{ fontSize: "2.3rem" }}>
          {" "}
          {wishlist.length > 0 && (
            <span className="cartCount">{wishlist.length}</span>
          )}
        </i>
      </Button>

      {isLoggedIn ? (
        <Dropdown>
          <Dropdown.Toggle variant="dark" size="sm" className="me-3 mt-3">
            <FontAwesomeIcon icon={faUser} style={{ fontSize: "2.3rem" }} />
          </Dropdown.Toggle>
          <Dropdown.Menu
            style={{ position: "absolute", left: "-160px", top: "65px" }}
          >
            <Dropdown.Item>
              <WelcomeMessage />
              {role === "Administrador" ? (
                <>
                  <Dropdown.Item as={Link} to="/dashboard">
                    Panel de Administrador
                  </Dropdown.Item>
                </>
              ) : (
                <></>
              )}
              <Dropdown.Item as={Link} to="/account">
                Mi Perfil
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/purchases">
                Mis Compras
              </Dropdown.Item>
            </Dropdown.Item>
            <Dropdown.Item>
              <LogoutButton />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Dropdown>
          <Dropdown.Toggle variant="dark" size="sm" className="me-3 mt-3">
            <FontAwesomeIcon icon={faUser} style={{ fontSize: "2.3rem" }} />
          </Dropdown.Toggle>
          <Dropdown.Menu
            style={{ position: "absolute", left: "-90px", top: "65px" }}
          >
            <Dropdown.Item>
              <LoginButton />
            </Dropdown.Item>
            <Dropdown.Item>
              <RegisterButton />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Navbar1);