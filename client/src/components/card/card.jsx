import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./card.css";

import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions";

const Cards = (props) => {
  const { sku, name, image, titulo, price } = props;
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
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
          <Button
            variant="dark"
            as={Link}
            to={`/detail/${sku}`}
            className="mt-2 btn me-2"
          >
            <i className="bi bi-eye-fill"></i>
          </Button>

          <Button
            variant="success"
            className="mt-2 btn me-2"
            onClick={() => handleAddToCart(props)}
          >
            <i className="bi bi-cart-plus"></i>
          </Button>

          <Button
            variant="danger"
            className="mt-2 btn me-2"
            //logica para agregar la tarjeta a favoritos
          >
            <i className="bi bi-heart"></i>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Cards;
