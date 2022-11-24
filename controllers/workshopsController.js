const sql = require("mssql");

async function getAllWorkshops(req, res) {
  const products = await req.db.query`SELECT * FROM Workshops`;
  res.json(products.recordsets[0]);
}

async function getWorkshop(req, res) {
  const id = +req.params.id;

  const product = await req.db
    .request()
    .input("id", sql.Int, id)
    .query("SELECT * FROM Workshops WHERE Id = @id");
  res.json(product.recordsets[0][0]);
}

async function addWorkshop(req, res) {
  const director = req.body.director;
  const phoneNumber = +req.body.phoneNumber;
  const workshopName = req.body.workshopName;
  

  const response = await req.db
    .request()
    .input("Director", sql.NVarChar(60), director)
    .input("PhoneNumber", sql.BigInt, phoneNumber)
    .input("WorkshopName", sql.NVarChar(40), workshopName)
    .execute("insertWorkshop");
  res.json({ rowsAffected: response.rowsAffected[0] });
}

async function updateWorkshop(req, res) {
  const id = +req.params.id;

  console.log(`req.body.phoneNumber = ${req.body.phoneNumber}`)

  const director = req.body.director;
  const phoneNumber = +req.body.phoneNumber;
  const workshopName = req.body.workshopName;

  console.log(req.body);
  console.log(`director = ${director}`)
  console.log(`phoneNumber = ${phoneNumber}`)
  console.log(`workshopName = ${workshopName}`)

  const response = await req.db
    .request()
    .input("id", sql.Int, id)
    .input("Director", sql.NVarChar(60), director)
    .input("PhoneNumber", sql.BigInt, phoneNumber)
    .input("WorkshopName", sql.NVarChar(40), workshopName)
    .execute("updateWorkshop");
    console.log(`rowsAffect: ${response.rowsAffected[0]}`);
  res.json({ rowsAffected: response.rowsAffected[0] });
}

async function deleteWorkshop(req, res) {
  const id = +req.params.id;

  const response = await req.db
    .request()
    .input("id", sql.Int, id)
    .query("DELETE Workshops WHERE Id = @id");

  res.json({ rowsAffected: response.rowsAffected[0] });
}

module.exports = {
  getAllWorkshops,
  getWorkshop,
  addWorkshop,
  updateWorkshop,
  deleteWorkshop,
};
