import { checkResponse } from "./api";

const baseUrl = "http://localhost:3001";

const defaultHeaders = {
  "Content-Type": "application/json",
};

function signup({ name, avatar, email, password }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
}

function signin({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

function getUser(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      ...defaultHeaders,
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export { signup, signin, getUser };
