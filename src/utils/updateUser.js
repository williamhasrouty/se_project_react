import { checkResponse } from "./api";
import { BASE_URL } from "./constants.js";

function updateUser({ name, avatar }, token) {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      ...defaultHeaders,
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
}

export default updateUser;
