

const url = "/api/products";

export async function getProducts() {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function addProduct(productData) {
  const response = await fetch(url, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productData)
  });
  const data = await response.json();
  return data;
}

export async function updateProduct(productData) {
  const response = await fetch(`${url}/${productData.id}`, {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productData)
  });
  const data = await response.json();
  return data;
}

export async function deleteProduct(productData) {
  const response = await fetch(`${url}/${productData.id}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  return data;
}


