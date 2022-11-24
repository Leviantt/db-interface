

const url = "/api/contracts";

export async function getContracts() {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function addContract(contractData) {
  const response = await fetch(url, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contractData)
  });
  const data = await response.json();
  return data;
}

export async function updateContract(contractData) {
  const response = await fetch(`${url}/${contractData.id}`, {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contractData)
  });
  const data = await response.json();
  return data;
}

export async function deleteContract(contractData) {
  const response = await fetch(`${url}/${contractData.id}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  return data;
}


