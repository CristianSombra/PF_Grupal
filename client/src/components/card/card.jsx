import React from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './card.css';

const Cards = (props) => {
  const { sku } = props;

  return (
    <Card className="custom-shadow custom-card">
      <Card.Img variant="top" src={props.image} alt={props.titulo} />
      <Card.Body className="text-center d-flex flex-column">
        <Card.Text>{props.name}</Card.Text>
        <Card.Title>$ {props.price}</Card.Title>
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
