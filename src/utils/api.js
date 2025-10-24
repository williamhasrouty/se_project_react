// Add like to a card
function addCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      ...defaultHeaders,
      authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));
}

// Remove like from a card
function removeCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      ...defaultHeaders,
      authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));
}
const baseUrl = "http://localhost:3001";

const defaultHeaders = {
  "Content-Type": "application/json",
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function getItems() {
  // Public endpoint
  return fetch(`${baseUrl}/items`).then((res) => checkResponse(res));
}

function addItem({ name, imageUrl, weather }, token) {
  const headers = { ...defaultHeaders };
  if (token) headers.authorization = `Bearer ${token}`;

  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then((res) => checkResponse(res));
}

function deleteItem(id, token) {
  const headers = { ...defaultHeaders };
  if (token) headers.authorization = `Bearer ${token}`;

  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers,
  }).then((res) => checkResponse(res));
}

export { getItems, addItem, deleteItem, addCardLike, removeCardLike };
