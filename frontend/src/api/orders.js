

const url = "/api/orders";

export async function getOrders() {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function addOrder(orderData) {
  const response = await fetch(url, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
  });
  const data = await response.json();
  return data;
}

export async function updateOrder(orderData) {
  const response = await fetch(`${url}/${orderData.id}`, {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
  });
  const data = await response.json();
  return data;
}

export async function deleteOrder(orderData) {
  const response = await fetch(`${url}/${orderData.id}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  return data;
}


