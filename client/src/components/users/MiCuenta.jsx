// MyAccount.js
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUserById } from '../../redux/actions/index';
import UpdateButton from "./UpdateButton";

const MyAccount = ({ user, loadedUser, error, loadUserById }) => {
  useEffect(() => {
    // Carga los datos del usuario cuando el componente se monta
    if (user && user.id) {
      loadUserById(user.id);
    }
  }, [user, loadUserById]);

  // Manejo de errores
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Renderizar el perfil del usuario si está cargado
  if (loadedUser) {
    return (
      <div>
      <div>
        <h1>Perfil de Usuario</h1>
        <p>Nombre: {loadedUser.first_name} {loadedUser.last_name}</p>
        <p>Correo electronico: {loadedUser.email}</p>
        <p>Direccion de envios: {loadedUser.delivery_address}</p>
        <p>Pais: {loadedUser.country}</p>
        <p>Telefono de contacto : {loadedUser.mobile}</p>
        <p>Actividad laboral : {loadedUser.CustomElementRegistry}</p>
        <p>Tipo de cuenta : {loadedUser.role}</p>
        <p>Historial de compras : {loadedUser.purchase_history}</p>
        
       </div>
       <UpdateButton/>
    </div>
    );
  }

  // El usuario todavía se está cargando, puedes mostrar un indicador de carga
  return <div>Cargando...</div>;
};

const mapStateToProps = (state) => ({
  user: state.user, // Obtén el objeto de usuario del estado global
  loadedUser: state.loadedUser,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({
  loadUserById: (userId) => dispatch(loadUserById(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
