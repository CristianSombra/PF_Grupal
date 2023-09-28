const { Order } = require('../db');
const Sequelize = require('sequelize');

const getTenProducts = async (req, res) => {
    try {
      // Obtener todas las órdenes de la base de datos.
      const allOrders = await Order.findAll();
  
      // Crear un objeto para almacenar las métricas de productos.
      const productMetrics = {};
  
      // Recorrer todas las órdenes y calcular las métricas de productos.
      allOrders.forEach((order) => {
        order.products.forEach((product) => {
          const { sku, name, quantity } = product;
          
          // Si el producto aún no está en las métricas, inicialízalo.
          if (!productMetrics[sku]) {
            productMetrics[sku] = {
              name,
              totalQuantity: 0,
            };
          }
          
          // Actualiza la cantidad total vendida para el producto.
          productMetrics[sku].totalQuantity += parseInt(quantity, 10);
        });
      });
  
      // Ordena los productos por cantidad total vendida en orden descendente.
      const topProducts = Object.values(productMetrics).sort((a, b) => b.totalQuantity - a.totalQuantity).slice(0, 10);
  
      res.json(topProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Hubo un error al obtener los productos más vendidos.' });
    }
  };


const getSalesPerMonthProducts = async (req, res) => {
    try {
        // Utilizamos Sequelize.fn para extraer el mes y año de createdAt y luego lo agrupamos
        // para calcular el total de ventas por mes.
        const monthlySales = await Order.findAll({
          attributes: [
            [Sequelize.fn('date_trunc', 'month', Sequelize.col('createdAt')), 'month'],
            [Sequelize.fn('sum', Sequelize.col('totalprice')), 'total_sales'],
          ],
          group: ['month'],
          order: Sequelize.literal('month DESC'),
        });
    
        res.json(monthlySales);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un error al calcular las ventas por mes.' });
      }
    };


module.exports = { getTenProducts, getSalesPerMonthProducts };