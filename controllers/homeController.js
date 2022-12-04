const sql = require("mssql");

async function getStatistics(req, res) {
  const response = await req.db
    .request()
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
