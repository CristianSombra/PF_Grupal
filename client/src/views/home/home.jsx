import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CardsContainer from "../../components/cardscontainer/cardscontainer";

export default function Home() {

  useEffect(() => {
  }, []);

  return (
    <div>
      <Link to="/">Salir</Link>
      <h1>Esta es la vista de HOME</h1>
      <CardsContainer />
    </div>
  );
}