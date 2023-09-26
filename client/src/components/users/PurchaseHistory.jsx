import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import axios from 'axios';
const PurchaseHistory = () => {
  const orderColumns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "user_id", headerName: "ID de Usuario", width: 250 },
    { field: "totalprice", headerName: "Total Orden", width: 250 },
    {
      field: "order_status",
      headerName: "Estado",
      width: 250,

    },
    {
      field: 'products',
      headerName: 'Products',
      width: 200,
      renderCell: (params) => (
        <Box>
          {params.row.products.map((product) => (
            <Box key={product.sku} display="flex" alignItems="center">
              <img
                src={product.image}
                alt={product.name}
                style={{ width: 50, height: 50 }}
/>
                <Typography variant="p">
                  {product.quantity} {product.name}
                </Typography>
            </Box>
          ))}
        </Box>
      ),
    },
  ];

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("id");
      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:3001/order/user/${userId}`,
            
          );

          if (response.data) {
            setOrders(response.data);
            console.log(response.data);
            // Procesa la respuesta si es necesario
          } else {
            console.error("Error al enviar la solicitud GET");
          }
        } catch (error) {
          console.error("Error al realizar la solicitud GET:", error);
        }
      }
    };

    fetchData();
  }, []);
  return (
    
    <div
    style={{
        margin: "150px",
        border:  "gray solid 1px",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.5)",
        marginBottom: "50px",
      }}
    >
      <h2>Mis Compras</h2>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={orders}
          columns={orderColumns}
          pageSize={5}
          components={{ Toolbar: GridToolbar }}
        />
      </div>
    </div>
  );
};
export default PurchaseHistory;
