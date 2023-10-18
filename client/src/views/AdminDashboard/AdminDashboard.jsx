import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getOrders,
  getUsers,
  getAllProducts,
  updateProduct,
  baseURL,
  updateUsers,
} from "../../redux/actions";
import {
  People,
  Plus,
  CartFill,
  Box,
  GraphUpArrow,
  BarChartLineFill,
} from "react-bootstrap-icons";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import TopTen from "../../components/graficas/toptenChart";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import SalesChart from "../../components/graficas/salesChart";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import ProductForm from "../productForm/productForm";
import "./AdminDashobard.css";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const products = useSelector((state) => state.products);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newOrderStatus, setNewOrderStatus] = useState("");
  const users = useSelector((state) => state.users);
  const orders = useSelector((state) => state.orders);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [selectedTab, setSelectedTab] = useState("salesChart");
  const [showCreateProductForm, setShowCreateProductForm] = useState(false);
  const [ratingMessage, setRatingMessage] = useState(""); // Estado para el mensaje de calificación
  const [reloadPage, setReloadPage] = useState(false); // Estado para controlar la recarga de la página

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getOrders());
    dispatch(getAllProducts());
  }, [dispatch, selectedUser, selectedOrder, selectedProduct]);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);

    if (tab === "createProduct") {
      setShowCreateProductForm(true);
    } else {
      setShowCreateProductForm(false);
    }
  };
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  // const handleUserClick = (user) => {
  //   setSelectedUser(user);
  //   const role = user.role === "Administrador" ? "Cliente" : "Administrador";
  //   const adminEmail = user.email === "admin@ecommerce.com" ? false : true;
  //   const MySwal = withReactContent(Swal);
  //   MySwal.fire({
  //     title: "Acciones de usuario",
  //     showCancelButton: true,
  //     confirmButtonText: `Cambiar Rol a ${role}`,
  //     showDenyButton: adminEmail,
  //     denyButtonText
  //     // denyButtonText: user.blocked ? "Desbloquear Usuario" : "Bloquear Usuario",
  //     cancelButtonText: "Cancelar",
  //     focusDeny: true,
  //     icon: "info",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         const userId = user.id;
  //         const role = user.role;

  //         if (role === "Cliente") {
  //           await axios.put(baseURL + `/user/id/${userId}`, {
  //             role: "Administrador",
  //           });
  //         }
  //         if (role === "Administrador") {
  //           await axios.put(baseURL + `/user/id/${userId}`, {
  //             role: "Cliente",
  //           });
  //         }
  //         setSelectedUser(null);
  //       } catch (error) {
  //         console.error("Error al actualizar el rol del usuario", error);
  //       }
  //     } else if (result.isDenied) {
  //       const email = user.email;
  //       // Cambia el estado de bloqueo del usuario en lugar de eliminarlo
  //       const updatedUsers = users.map((u) => {
  //         if (u.email === email) {
  //           return { ...u, blocked: !u.blocked };
  //         }
  //         return u;
  //       });
  //       // Actualiza el estado a través de Redux
  //       dispatch(updateUsers(updatedUsers));
  //     }
  //   });
  // };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    const role = user.role === "Administrador" ? "Cliente" : "Administrador";
    const adminEmail = user.email === "admin@ecommerce.com" ? false : true;
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Acciones de usuario",
      showCancelButton: true,
      confirmButtonText: `Cambiar Rol a ${role}`,
      showDenyButton: adminEmail,
      denyButtonText: "Borrar Usuario",
      cancelButtonText: "Cancelar",
      focusDeny: true,
      icon: "info",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const userId = user.id;
          const role = user.role;

          if (role === "Cliente") {
            await axios.put(baseURL + `/user/id/${userId}`, {
              role: "Administrador",
            });
          }
          if (role === "Administrador") {
            await axios.put(baseURL + `/user/id/${userId}`, {
              role: "Cliente",
            });
          }
          setSelectedUser(null);
        } catch (error) {
          console.error("Error al actualizar el rol del usuario", error);
        }
      } else if (result.isDenied) {
        const email = user.email;
        await axios.delete(baseURL + `/user/id/${email}`);
        setSelectedUser(null);
      }
    });
  };

  const handleOrderClick = (order, event) => {
    setSelectedOrder(order);
    event.stopPropagation();

    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Editar Estado de la Orden",
      html: (
        <div className="status-buttons-container">
          <Button
            onClick={() => handleChangeOrderStatus(order.id, "Completa")}
            variant={"light"}
            style={{ margin: "2px" }}
            className="status-button"
          >
            Completa
          </Button>
          <Button
            onClick={() => handleChangeOrderStatus(order.id, "Fallida")}
            variant={"light"}
            style={{ margin: "2px" }}
            className="status-button"
          >
            Fallida
          </Button>
          <Button
            onClick={() => handleChangeOrderStatus(order.id, "En Proceso")}
            variant={"light"}
            style={{ margin: "2px" }}
            className="status-button"
          >
            En Proceso
          </Button>
          <Button
            onClick={() =>
              handleChangeOrderStatus(order.id, "Pendiente de Pago")
            }
            variant={"light"}
            style={{ margin: "2px" }}
            className="status-button"
          >
            Pendiente de Pago
          </Button>
          <Button
            onClick={() => handleChangeOrderStatus(order.id, "Por Facturar")}
            variant={"light"}
            style={{ margin: "2px" }}
            className="status-button"
          >
            Por Facturar
          </Button>
        </div>
      ),
      showCancelButton: true,
      showConfirmButton: true,
      allowOutsideClick: false,
      icon: "info",
    }).then(() => {
      setSelectedOrder(null);
    });
  };

  const handleChangeOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(baseURL + `/order/update/${orderId}`, {
        order_status: newStatus,
      });
      dispatch(getOrders());
      setNewOrderStatus(newStatus);
    } catch (error) {
      // console.error("Error al actualizar el estado de la orden", error);
    }
  };

  const handleChangeDisponibility = async (product) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Cambiar Disponibilidad",
      input: "text",
      inputValue: product.disponibility.toString(),
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return "Debes ingresar una disponibilidad";
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const productId = product.sku;
          const updatedFields = { disponibility: result.value };
          dispatch(updateProduct(productId, updatedFields));
          dispatch(getAllProducts());
  
          // Mostrar la alerta de Sweetalert
          MySwal.fire({
            title: "¡Éxito!",
            text: "El producto se ha actualizado correctamente.",
            icon: "success",
          });
  
          setRatingMessage("Stock actualizado correctamente.");
          setReloadPage(true);
        } catch (error) {
          console.error(
            "Error al actualizar la disponibilidad del producto",
            error
          );
        }
      }
    });
  };
  
  const handleChangePrice = async (product) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Cambiar Precio",
      input: "text",
      inputValue: "$" + product.price.toString(),
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return "Debes ingresar un precio";
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const productId = product.sku;
          const updatedFields = { price: result.value };
          dispatch(updateProduct(productId, updatedFields));
  
          // Mostrar la alerta de Sweetalert
          MySwal.fire({
            title: "¡Éxito!",
            text: "El producto se ha actualizado correctamente.",
            icon: "success",
          });
  
          setRatingMessage("Precio actualizado correctamente.");
          setReloadPage(true);
        } catch (error) {
          console.error(
            "Error al actualizar la disponibilidad del producto",
            error
          );
        }
      }
    });
  };
  
  const handleChangeTitulo = async (product) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Cambiar Título",
      input: "text",
      inputValue: product.titulo.toString(),
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return "Debes ingresar un título";
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const productId = product.sku;
          const updatedFields = { titulo: result.value };
          dispatch(updateProduct(productId, updatedFields));
  
          // Mostrar la alerta de Sweetalert
          MySwal.fire({
            title: "¡Éxito!",
            text: "El producto se ha actualizado correctamente.",
            icon: "success",
          });
  
          setRatingMessage("Nombre actualizado correctamente.");
          setReloadPage(true);
        } catch (error) {
          console.error(
            "Error al actualizar la disponibilidad del producto",
            error
          );
        }
      }
    });
  };
  

  const productColumns = [
    { field: "sku", headerName: "SKU", width: 100 },
    { field: "number_part", headerName: "Número de Parte", width: 110 },
    {
      field: "titulo",
      headerName: "Título",
      width: 680,
      renderCell: (params) => {
        return (
          <div>
            <Button onClick={() => handleChangeTitulo(params.row)}>
              <i class="bi bi-pencil-square"></i>
            </Button>
            &nbsp;
            {params.row.titulo}
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Precio",
      width: 150,
      
      renderCell: (params) => {
        // Formatear el precio con el signo "$"
        const formattedPrice = `$${params.row.price.toLocaleString()}`;
        return (
          <div>
            <Button onClick={() => handleChangePrice(params.row)}>
              <i class="bi bi-pencil-square"></i>
            </Button>
            &nbsp;
            {formattedPrice}
          </div>
        );
      },
    },
    {
      field: "disponibility",
      headerName: "Disponibilidad",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            <Button onClick={() => handleChangeDisponibility(params.row)}>
              <i class="bi bi-pencil-square"></i>
            </Button>
            &nbsp;
            {params.row.disponibility}
          </div>
        );
      },
    },
  ];

  const orderColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 200,
      onCellClick: (params) => {
        setSelectedOrderDetails(params.row);
        setIsModalOpen(true);
      },
    },
    { field: "user_id", headerName: "ID de Usuario", width: 250 },
    { field: "totalprice", 
    headerName: "Total Orden", 
    width: 250,
    renderCell: (params) => {
      // Formatear el precio con el signo "$"
      const formattedPrice = `$${params.row.totalprice.toLocaleString()}`;
      return (
        <h7>
          {formattedPrice}
        </h7>
      );
    },
  },

    {
      field: "order_status",
      headerName: "Estado",
      width: 250,
      renderCell: (params) => {
        
        return (
          <Button
            onClick={(event) => {
              event.stopPropagation();
              handleOrderClick(params.row, event);
            }}
          >
            {params.row.order_status}
          </Button>
        );
      },
    },
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "user_name", headerName: "Nombre de Usuario", width: 150 },
    { field: "first_name", headerName: "Nombre", width: 150 },
    { field: "last_name", headerName: "Apellido", width: 150 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "role", headerName: "Rol", width: 150 },
    // {
    //   field: "blocked",
    //   headerName: "Bloqueado",
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <div>
    //         {params.row.blocked ? (
    //           <Button
    //             onClick={() => handleUserClick(params.row)}
    //             variant="success"
    //           >
    //             Desbloquear
    //           </Button>
    //         ) : (
    //           <Button onClick={() => handleUserClick(params.row)} variant="danger">
    //             Bloquear
    //           </Button>
    //         )}
    //       </div>
    //     );
    //   },
    // },
    {
      field: "action",
      headerName: "Acciones",
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            <Button onClick={() => handleUserClick(params.row)}>
              <i class="bi bi-pencil-square"></i>
            </Button>
          </div>
        );
      },
    },
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case "salesChart":
        return <SalesChart />;
      case "topTen":
        return <TopTen />;
      case "users":
        return (
          <>
            <h2>Usuarios</h2>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={users}
                columns={columns}
                pageSize={5}
                components={{ Toolbar: GridToolbar }}
              />
            </div>
          </>
        );
      case "createProduct":
        // Renderiza el componente ProductForm con la primera letra en mayúscula.
        if (showCreateProductForm) {
          return <ProductForm />;
        } else {
          // Renderiza un mensaje o componente de carga inicial si es necesario.
          return <div>Cargando...</div>;
        }
      case "orders":
        return (
          <>
            <h2>Órdenes</h2>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={orders}
                columns={orderColumns}
                pageSize={5}
                components={{ Toolbar: GridToolbar }}
                onRowClick={(params) => {
                  setSelectedOrderDetails(params.row);
                  setIsModalOpen(true);
                }}
              />
            </div>
          </>
        );
      case "inventory":
        return (
          <>
            <h2>Inventario:</h2>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={products}
                columns={productColumns}
                pageSize={5}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row.sku}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        marginTop: "100px",
      }}
    >
      <div
        style={{
          width: "250px",
          background: "#333",
          padding: "20px",
          height: "auto",
        }}
      >
        <div
          style={{
            width: "200px",
            background: "#333",
            padding: "20px",
            height: "auto",
          }}
        >
          <Button
            onClick={() => handleTabClick("salesChart")}
            variant="dark"
            className={`sidebar-button ${
              selectedTab === "salesChart" ? "active" : ""
            }`}
          >
            <BarChartLineFill size={24} />
            &nbsp; Ventas mensuales
          </Button>
          <Button
            onClick={() => handleTabClick("topTen")}
            variant="dark"
            className={`sidebar-button ${
              selectedTab === "topTen" ? "active" : ""
            }`}
          >
            <GraphUpArrow size={24} />
            &nbsp; Mas vendidos
          </Button>
          <Button
            onClick={() => handleTabClick("users")}
            variant="dark"
            className={`sidebar-button ${
              selectedTab === "users" ? "active" : ""
            }`}
          >
            <People size={24} />
            &nbsp; Usuarios
          </Button>
          <Button
            onClick={() => handleTabClick("orders")}
            variant="dark"
            className={`sidebar-button ${
              selectedTab === "orders" ? "active" : ""
            }`}
          >
            <CartFill size={24} />
            &nbsp; Órdenes
          </Button>
          <Button
            onClick={() => handleTabClick("inventory")}
            variant="dark"
            className={`sidebar-button ${
              selectedTab === "inventory" ? "active" : ""
            }`}
          >
            <Box size={24} />
            &nbsp; Inventario
          </Button>
          <Button
            onClick={() => handleTabClick("createProduct")}
            variant="dark"
            className={`sidebar-button ${
              selectedTab === "createProduct" ? "active" : ""
            }`}
          >
            <Plus size={24} />
            &nbsp; Crear Producto
          </Button>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <h1>Panel de Administración</h1>
        <hr />
        {renderContent()}
      </div>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>Detalles de la Órden</DialogTitle>
        <DialogContent>
          {selectedOrderDetails && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>SKU</TableCell>
                  <TableCell>Imágen</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Cantidad</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedOrderDetails.products.map((product) => (
                  <TableRow key={product.sku}>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: 50, height: 50 }}
                      />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
