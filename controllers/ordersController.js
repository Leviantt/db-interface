const sql = require("mssql");

async function getAllOrders(req, res) {
  const products = await req.db.query`SELECT * FROM Orders`;
  res.json(products.recordsets[0]);
}

async function getOrder(req, res) {
  const id = +req.params.id;

  const product = await req.db
    .request()
    .input("id", sql.Int, id)
    .query("SELECT * FROM Orders WHERE Id = @id");
  res.json(product.recordsets[0][0]);
}

async function addOrder(req, res) {
  const contractId = +req.body.contractId;
  const productId = +req.body.productId;
  const productsCount = +req.body.productsCount;

  const response = await req.db
    .request()
    .input("ContractId", sql.Int, contractId)
    .input("ProductId", sql.Int, productId)
    .input("ProductsCount", sql.Int, productsCount)
    .execute("insertOrder");
  res.json({ rowsAffected: response.rowsAffected[0] });
}

async function updateOrder(req, res) {
  const id = +req.params.id;

  const contractId = +req.body.contractId;
  const productId = +req.body.productId;
  const productsCount = +req.body.productsCount;

  const response = await req.db
    .request()
    .input("Id", sql.Int, id)
    .input("ContractId", sql.Int, contractId)
    .input("ProductId", sql.Int, productId)
    .input("ProductsCount", sql.Int, productsCount)
    .execute("updateOrder");
  res.json({ rowsAffected: response.rowsAffected[0] });
}

async function deleteOrder(req, res) {
  const id = +req.params.id;

  const response = await req.db
    .request()
    .input("id", sql.Int, id)
    .query("DELETE Orders WHERE Id = @id");

  res.json({ rowsAffected: response.rowsAffected[0] });
}

module.exports = {
  getAllOrders,
  getOrder,
  addOrder,
  updateOrder,
  deleteOrder,
};
