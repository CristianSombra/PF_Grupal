const { Router } = require("express");
const mainRouter = Router(); 

//IMPORTAMOS TODAS LAS RUTAS
const productsRouter = require("./productRouter");
const userRouter = require("./userRouter");
const orderRouter = require("./orderRouter");
const cartRouter = require("./cartRouter");
const ratingRouter = require("./ratingRouter");
const paymentRouter = require("./paymentRouter");
const brandRouter = require("./brandRouter");
const categoryRouter = require("./categoryRouter");


//DEFINICION DE USO DE LAS RUTAS
mainRouter.use("/products", productsRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/order", orderRouter);
mainRouter.use("/cart", cartRouter);
mainRouter.use("/rating", ratingRouter);
mainRouter.use("/payments", paymentRouter);
mainRouter.use("/brand", brandRouter);
mainRouter.use("/category", categoryRouter);


module.exports = mainRouter;
