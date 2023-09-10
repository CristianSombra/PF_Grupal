import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateUserInfo } from '../../redux/actions/index';
  import { Button } from 'react-bootstrap';
  
const UpdateAccount = ({ userId, updateUserInfo }) => {
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null); // Estado para manejar errores


  const handleUpdate = async () => {
    try {
      // Llama a la acción para actualizar la contraseña del usuario
      await updateUserInfo(userId, newPassword);

      // Si la actualización es exitosa, muestra un mensaje y redirige
      alert('Contraseña actualizada correctamente.');
      // Aquí puedes redirigir al usuario a donde desees, por ejemplo, la página de su cuenta.
    } catch (err) {
      setError(err.response?.data?.error || 'Error al actualizar la contraseña.'); // Maneja el error
    }
  };

  return (
    <div>
      <h3>Ingresa tu nueva contraseña</h3>
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Muestra el mensaje de error si hay uno */}
      <label>Nueva Contraseña:</label>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Button onClick={handleUpdate} variant="dark" size="sm">Actualizar</Button>
      
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateUserInfo: (userId, newPassword) =>
    dispatch(updateUserInfo(userId, newPassword)),
});

export default connect(null, mapDispatchToProps)(UpdateAccount);
