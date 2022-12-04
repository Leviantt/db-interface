require('dotenv').config();
const express = require('express');
const app = express();

const sql = require('mssql');
const dbConfig = require('./config/db.js');
const productsRouter = require('./routes/productsRouter.js');
const workshopsRouter = require('./routes/workshopsRouter.js');
const ordersRouter = require('./routes/ordersRouter.js');
const contractsRouter = require('./routes/contractsRouter.js');
const homeRouter = require('./routes/homeRouter.js');

const { errorHandler } = require('./middlewares/errorMiddleware.js')
app.use(errorHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", productsRouter);
app.use("/api/workshops", workshopsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/contracts", contractsRouter);
app.use("/api", homeRouter);

const pool = new sql.ConnectionPool(dbConfig);

pool.connect().then(pool => {
  app.request.db = pool;
  
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server has been started on port ${port}...`)
  })
})
















// app.use("/api/contracts", goalRouter);
// app.use("/api/orders", userRouter);
// app.use("/api/workshops", userRouter);


// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log(`Serves has been started on port ${port}...`);
// });
