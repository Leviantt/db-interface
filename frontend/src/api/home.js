const url = "/api";

export async function getStatistics(year) {
  console.log(`year = ${year}`);
  const response = await fetch(`${url}?startDate=01-01-${year}&endDate=01-01-${+year + 1}`);
  const data = await response.json();
  return data;
}