const url = "/api";

export async function getStatistics() {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}