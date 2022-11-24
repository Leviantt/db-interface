const sql = require("mssql");

async function getAllProducts(req, res) {
  const products = await req.db.query`SELECT * FROM Products`;
  res.json(products.recordsets[0]);
}

async function getProduct(req, res) {
  const { id } = req.params;

  const product = await req.db
    .request()
    .input("id", sql.Int, id)
    .query("SELECT * FROM Products WHERE Id = @id");
  res.json(product.recordsets[0][0]);
}

async function addProduct(req, res) {
  const workshopId = +req.body.workshopId;
  const productName = req.body.productName;
  const singleProductCost = +req.body.singleProductCost;

  const response = await req.db
    .request()
    .input("WorkshopId", sql.Int, workshopId)
    .input("ProductName", sql.VarChar(60), productName)
    .input("SingleProductCost", sql.Money, singleProductCost)
    .execute("insertProduct");
  res.json({ rowsAffected: response.rowsAffected[0] });
}

async function updateProduct(req, res) {
  const id = +req.params.id;

  const workshopId = +req.body.workshopId;
  const productName = req.body.productName;
  const singleProductCost = +req.body.singleProductCost;

  const response = await req.db
    .request()
    .input("Id", sql.Int, id)
    .input("WorkshopId", sql.Int, workshopId)
    .input("ProductName", sql.VarChar(60), productName)
    .input("SingleProductCost", sql.Money, singleProductCost)
    .execute("updateProduct");

  res.json({ rowsAffected: response.rowsAffected[0] });
}

async function deleteProduct(req, res) {
  const { id } = req.params;

  const response = await req.db
    .request()
    .input("id", sql.Int, id)
    .query("DELETE Products WHERE Id = @id");

  res.json({ rowsAffected: response.rowsAffected[0] });
}

module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
