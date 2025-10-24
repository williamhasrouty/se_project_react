const baseUrl = "http://localhost:3001";

const defaultHeaders = {
  "Content-Type": "application/json",
};

function checkResponse(res) {
  if (res.ok) return res.json();
  return Promise.reject(`Error: ${res.status}`);
}

function signup({ name, avatar, email, password }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ name, avatar, email, password }),
  }).then((res) => checkResponse(res));
}

function signin({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
}

function getUser(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      ...defaultHeaders,
      authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));
}

export { signup, signin, getUser };
