import React, { useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { createRating } from '../../redux/actions/index';

const AddRating = (props) => { // Recibes product_id como una prop
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [rate, setRate] = useState(0);
  const [review, setReview] = useState('');

  const handleAddRating = () => {
    dispatch(createRating(props.product_id, rate, review)); // Utiliza props.product_id
    // Limpia los campos después de agregar la calificación
    setRate(0);
    setReview('');
  };

  // Verifica si el usuario está conectado
  if (!user) {
    return null;
  }

  return (
    <div>
      <select value={rate} onChange={(e) => setRate(e.target.value)}>
        <option value={0}>Selecciona una calificación</option>
        <option value={1}>1 estrella</option>
        <option value={2}>2 estrellas</option>
        <option value={3}>3 estrellas</option>
        <option value={4}>4 estrellas</option>
        <option value={5}>5 estrellas</option>
      </select>
      <input
        type="text"
        placeholder="Escribe una reseña"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <button onClick={handleAddRating}>Agregar Calificación</button>
    </div>
  );
};

export default AddRating;
