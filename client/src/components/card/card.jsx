import React from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './card.css';

const Cards = (props) => {
  const { sku } = props;


  return (
    <Card className="custom-shadow custom-card">
      <div className="imgContainer">
        <Card.Img variant="top" src={props.image} alt={props.titulo} />
      </div>
      <Card.Body className="text-center d-flex flex-column">
        <Card.Text className="titleCard">{props.name}</Card.Text>
        <Card.Title className="mb-4">$ {new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "COP",
        }).format(props.price)}</Card.Title>
        <div className="mt-3 text-center">
          <Button variant="dark" as={Link} to={`/detail/${sku}`}>
            Ver detalles
          </Button>

        </div>
      </Card.Body>
    </Card>
  );
};

export default Cards;