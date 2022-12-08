const sql = require("mssql");


// '01-01-2023', '01-01-2024'
async function getStatistics(req, res) {
  console.log(req.query);
  const { startDate, endDate } = req.query;
  console.log(startDate);
  console.log(endDate);
  const response = await req.db
    .request()
    .input("StartDate", sql.Date, startDate)
    .input("EndDate", sql.Date, endDate)
    .execute("getStatistics");
  const workshops = response.recordsets[0];
  const groupedWorkshops = {};
  for(let workshop of workshops) {
    if(groupedWorkshops[workshop.WorkshopName] != null) {
      groupedWorkshops[workshop.WorkshopName].push(workshop);
    } else {
      groupedWorkshops[workshop.WorkshopName] = [workshop];
    }
  }
  res.json(groupedWorkshops);
}

module.exports = { getStatistics };
