import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { addToWishlist, addToCart } from "../../redux/actions";
import { useSelector, useDispatch } from 'react-redux';
import "./card.css";
import Swal from "sweetalert2";

const Cards = (props) => {
  const { sku, name, image, titulo, price } = props;
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      Swal.fire({
        icon: "warning",
        title: "No has iniciado sesión",
        text: "Debes iniciar sesión para agregar al carrito.",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1200,
      });
      return;
    }
    dispatch(addToCart(props)); 
    Swal.fire({
      icon: "success",
      title: "Agregado al carrito",
      text: `${name} se ha agregado al carrito.`,
      imageUrl: image,
      imageAlt: titulo,
      showCancelButton: false,
      showConfirmButton: false,
      timer: 1200,
    });
  };

  const handleAddToWishlist = () => {
    if (!isLoggedIn) {
      Swal.fire({
        icon: "warning",
        title: "No has iniciado sesión",
        text: "Inicia sesión para añadir a favoritos",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1200,
      });
      return;
    }

    const alreadyInWishlist = wishlist.some((item) => item.sku === sku); 

    if (!alreadyInWishlist) {
      dispatch(addToWishlist(props)); 
      Swal.fire({
        icon: "success",
        title: "Agregado a favoritos",
        text: `${name} se ha agregado a la wishlist.`,
        imageUrl: image,
        imageAlt: titulo,
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1200,
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "Producto ya en favoritos",
        text: `${name} ya se encuentra en tu wishlist.`,
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1200,
      });
    }
  };

  return (
    <Card className="custom-shadow custom-card">
      <div className="imgContainer">
        <Card.Img variant="top" src={image} alt={titulo} />
      </div>
      <Card.Body className="text-center d-flex flex-column">
        <Card.Text className="titleCard">{name}</Card.Text>
        <Card.Title className="mb-4">
          ${" "}
          {new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "COP",
          }).format(price)}
        </Card.Title>
        <div className="mt-3 text-center d-flex justify-content-between">
          <div>
            <Button
              variant="dark"
              as={Link}
              to={`/detail/${sku}`}
              className="mt-2 btn me-2 hover-effect"
            >
              <i className="bi bi-eye-fill"></i>
            </Button>
          </div>
          <div>
            <Button
              variant="success"
              className="mt-2 btn me-2 hover-effect"
              onClick={handleAddToCart}
            >
              <i className="bi bi-cart-plus"></i>
            </Button>
          </div>
          <div>
            <Button
              variant="danger"
              className="mt-2 btn me-2 hover-effect"
              onClick={handleAddToWishlist}
            >
              <i className="bi bi-heart"></i>
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Cards;
