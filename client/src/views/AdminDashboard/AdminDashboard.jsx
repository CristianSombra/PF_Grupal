import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, getUsers } from '../../redux/actions';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newOrderStatus, setNewOrderStatus] = useState('');
  const users = useSelector((state) => state.users);
  const orders = useSelector((state) => (state.orders));
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(getUsers());
    dispatch(getOrders());
  }, [dispatch, selectedUser, selectedOrder]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    const role = user.role === "Administrador" ? "Cliente" : "Administrador";
    const adminEmail = user.email === "admin@ecommerce.com" ? false : true;
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: 'Acciones de usuario',
      showCancelButton: true,
      confirmButtonText: `Cambiar Rol a ${role}`,
      showDenyButton: adminEmail,
      denyButtonText: 'Borrar Usuario',
      cancelButtonText: 'Cancelar',
      focusDeny: true,
      icon: 'info',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const userId = user.id;
          const role = user.role;

          if (role === "Cliente") {
            await axios.put(`http://localhost:3001/user/id/${userId}`, { role: "Administrador" });
          }
          if (role === "Administrador") {
            await axios.put(`http://localhost:3001/user/id/${userId}`, { role: "Cliente" });
          }
          setSelectedUser(null);
        } catch (error) {
          console.error("Error al actualizar el rol del usuario", error);
        }
      } else if (result.isDenied) {
        const email = user.email;
        await axios.delete(`http://localhost:3001/user/id/${email}`);
        setSelectedUser(null);
      }
    });
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: 'Editar Estado de la Orden',
      html: (
        <div className="status-buttons-container">
          <Button
            onClick={() => handleChangeOrderStatus(order.id, "Completa")}
            variant={"light"}
            style={{margin:"2px"}}
            className="status-button"
          >
            Completa
          </Button>
          <Button
            onClick={() => handleChangeOrderStatus(order.id, "Fallida")}
            variant={"light"}
            style={{margin:"2px"}}
            className="status-button"
          >
            Fallida
          </Button>
          <Button
            onClick={() => handleChangeOrderStatus(order.id, "En Proceso")}
            variant={"light"}
            style={{margin:"2px"}}
            className="status-button"
          >
            En Proceso
          </Button>
          <Button
            onClick={() => handleChangeOrderStatus(order.id, "Pendiente de Pago")}
            variant={"light"}
            style={{margin:"2px"}}
            className="status-button"
          >
            Pendiente de Pago
          </Button>
          <Button
            onClick={() => handleChangeOrderStatus(order.id, "Por Facturar")}
            variant={"light"}
            style={{margin:"2px"}}
            className="status-button"
          >
            Por Facturar
          </Button>
        </div>
      ),
      showCancelButton: true,
      showConfirmButton: true,
      allowOutsideClick: false,
      icon: 'info',
    }).then(() => {
      setSelectedOrder(null);
    });
  };
  
  
  const handleChangeOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:3001/order/update/${orderId}`, { order_status: newStatus });
      dispatch(getOrders());
      setNewOrderStatus(newStatus); // Actualizar el estado local
    } catch (error) {
      console.error("Error al actualizar el estado de la orden", error);
    }
  };
  
  

  const orderColumns = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'user_id', headerName: 'ID de Usuario', width: 250 },
    { field: 'totalprice', headerName: 'Total Orden', width: 250 },
    {
      field: 'order_status',
      headerName: 'Estado',
      width: 250,
      renderCell: (params) => {
        return (
          <Button onClick={() => handleOrderClick(params.row)}>
            {params.row.order_status}
          </Button>
        );
      },
    },
  ];

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'user_name', headerName: 'Nombre de Usuario', width: 150 },
    { field: 'first_name', headerName: 'Nombre', width: 150 },
    { field: 'last_name', headerName: 'Apellido', width: 150 },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'role', headerName: 'Rol', width: 150 },
    {
      field: 'action',
      headerName: 'Acciones',
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            <Button onClick={() => handleUserClick(params.row)}>Editar</Button>
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ margin: '150px', borderRadius: '10px', padding: '20px', boxShadow: '5px 5px 10px 2px rgba(0, 0, 0, 0.5)', marginBottom: '20px' }}>
      <div className="row">
        <div className="col-md-9">
          <h1>Panel de Administración</h1>
        </div>
        <div className="col-md-2">
          <Button style={{ width: "100%", height: "100%" }} onClick={() => navigate("/createProduct")}>Crear Producto</Button>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <h2>Métrica 1</h2>
          <img style={{ width: "80%", height: "70%" }} src="https://www.tibco.com/sites/tibco/files/media_entity/2022-01/doughnut-chart-example.svg" alt="Ejemplo 1" />
        </div>
        <div className="col-md-6">
          <h2>Métrica 2</h2>
          <img style={{ width: "90%" }} src="https://lh5.googleusercontent.com/88VfYTfZWk5cmkJAhw1gEbo7aHkbI2QFXZWRwq0BxK5mOA9Z1-f-MOBhPUFMZVCccYuaCtnkGY8XP8Y-6Hip13KbVoefd-Fzn5lir94BjPO9gc7fC6Tgrnvl9HCL5fzO-Kozs0psGqZidKOTozlZPTMqziv1dSP44gh2X5Fw6VROcWEeaubof61TkehV" alt="Ejemplo 1" />
        </div>
      </div>
      <hr />
      <h2>Usuarios</h2>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={users} columns={columns} pageSize={5} components={{ Toolbar: GridToolbar }} />
      </div>
      <hr />
      <h2>Órdenes</h2>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={orders} columns={orderColumns} pageSize={5} components={{ Toolbar: GridToolbar }} />
      </div>
    </div>
  );
}
