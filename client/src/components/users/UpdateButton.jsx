import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const UpdateButton = () => {
  return (
    
      <Button as={Link} to="/updateaccount" variant="dark" size="sm">Actualizar datos</Button>
     
  );
};

export default UpdateButton;