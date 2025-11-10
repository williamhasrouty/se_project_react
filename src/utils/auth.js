import { checkResponse } from "./api";
import { BASE_URL } from "./constants.js";

const defaultHeaders = {
  "Content-Type": "application/json",
};

function signup({ name, avatar, email, password }) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
}

function signin({ email, password }) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

function getUser(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      ...defaultHeaders,
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export { signup, signin, getUser };
