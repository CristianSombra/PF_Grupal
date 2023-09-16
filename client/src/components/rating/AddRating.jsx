import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRating } from '../../redux/actions/index';
import { getRatings } from '../../redux/actions';
import { Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importa Link desde React Router

const AddRating = ({ product_id }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [showModal, setShowModal] = useState(false);
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState('');
  const [error, setError] = useState('');

  const handleClose = () => {
    setShowModal(false);
    setError('');
  };
  
  const handleShow = () => setShowModal(true);

  const handleAddRating = () => {
    if (!user) {
      // Si el usuario no está autenticado, muestra un mensaje de error
      setError('Debes iniciar sesión para calificar.');
      return;
    }

    if (rate === 0) {
      setError('Debes seleccionar una calificación.');
      return;
    }

    if (review.trim() === '') {
      setError('Debes agregar un comentario.');
      return;
    }

    // Evita que el usuario pueda volver a seleccionar "Selecciona una calificación"
    if (rate === "Selecciona una calificación") {
      setError('Debes seleccionar una calificación válida.');
      return;
    }

    dispatch(createRating(product_id, rate, review));
    dispatch(getRatings());
    setRate(0);
    setReview('');
    dispatch(getRatings());
    handleClose();
  };

  return (
    <div className="text-center">
      {user ? (
        <Button variant="dark" size="md" onClick={handleShow}>
          Calificar
        </Button>
      ) : (
        // Si el usuario no está autenticado, muestra el enlace de inicio de sesión
        <Button variant="dark" size="sm" as={Link} to="/login">
        Inicia sesión para calificar
      </Button>

      
      )}

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Calificación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Calificación:</Form.Label>
              <Form.Control
                as="select"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              >
                <option value={null}>Selecciona una calificación</option>
                <option value={1}>1 estrella</option>
                <option value={2}>2 estrellas</option>
                <option value={3}>3 estrellas</option>
                <option value={4}>4 estrellas</option>
                <option value={5}>5 estrellas</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Reseña (máximo 50 caracteres):</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                maxLength={50}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Escribe una reseña"
              />
            </Form.Group>
            {error && <p className="text-danger">{error}</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAddRating}>
            Agregar Calificación
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddRating;
