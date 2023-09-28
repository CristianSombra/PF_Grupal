const { Router } = require("express");
const { getTenProducts, getSalesPerMonthProducts } = require("../handlers/metricsHandler");

const metricsRouter = Router();

metricsRouter.get('/ten', getTenProducts);
metricsRouter.get('/sales', getSalesPerMonthProducts);

module.exports = metricsRouter;