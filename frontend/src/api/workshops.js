

const url = "/api/workshops";

export async function getWorkshops() {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function addWorkshop(workshopData) {
  const response = await fetch(url, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(workshopData)
  });
  const data = await response.json();
  return data;
}

export async function updateWorkshop(workshopData) {
  console.log(workshopData);
  const response = await fetch(`${url}/${workshopData.id}`, {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(workshopData)
  });
  const data = await response.json();
  return data;
}

export async function deleteWorkshop(workshopData) {
  const response = await fetch(`${url}/${workshopData.id}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  return data;
}
