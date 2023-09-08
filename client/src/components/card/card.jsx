import React from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Cards = (props) => {
  const { sku } = props;

  return (
    <Card style={{ width: '15rem' }} className="mb-3">
      <Card.Img variant="top" src={props.image} alt={props.titulo} />
      <Card.Body className="text-center d-flex flex-column">
        <Card.Text>{props.name}</Card.Text>
        <Card.Title>$ {props.price}</Card.Title>
        <Button variant="dark" as={Link} to={`/detail/${sku}`} className="mx-auto mt-auto">
          Ver detalles
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Cards;
