const sql = require("mssql");

async function getAllContracts(req, res) {
  const products = await req.db.query`SELECT * FROM Contracts`;
  res.json(products.recordsets[0]);
}

async function getContract(req, res) {
  const id = +req.params.id;

  const product = await req.db
    .request()
    .input("id", sql.Int, id)
    .query("SELECT * FROM Contracts WHERE Id = @id");
  res.json(product.recordsets[0][0]);
}

async function addContract(req, res) {
  const { registrationDate, executionDate, customerName, customerAddress } =
    req.body;

  console.log(req.body);

  const response = await req.db
    .request()
    .input("RegistrationDate", sql.Date, registrationDate)
    .input("ExecutionDate", sql.Date, executionDate)
    .input("CustomerName", sql.NVarChar(60), customerName)
    .input("CustomerAddress", sql.NVarChar(60), customerAddress)
    .execute("insertContract");
  res.json({ rowsAffected: response.rowsAffected[0] });
}

async function updateContract(req, res) {
  const id = +req.params.id;
  console.log(req.body);
  const { registrationDate, executionDate, customerName, customerAddress } =
    req.body;

  const response = await req.db
    .request()
    .input("Id", sql.Int, id)
    .input("RegistrationDate", sql.Date, registrationDate)
    .input("ExecutionDate", sql.Date, executionDate)
    .input("CustomerName", sql.NVarChar(60), customerName)
    .input("CustomerAddress", sql.NVarChar(60), customerAddress)
    .execute("updateContract");
  res.json({ rowsAffected: response.rowsAffected[0] });
}

async function deleteContract(req, res) {
  const id = +req.params.id;
  console.log(`backend deleteContract: id = ${id}`)
  const response = await req.db
    .request()
    .input("id", sql.Int, id)
    .query("DELETE Contracts WHERE Id = @id");

  res.json({ rowsAffected: response.rowsAffected[0] });
}

module.exports = {
  getAllContracts,
  getContract,
  addContract,
  updateContract,
  deleteContract,
};
