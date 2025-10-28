import { checkResponse } from "./api";

function updateUser({ name, avatar }, token) {
  const baseUrl = "http://localhost:3001";
  const defaultHeaders = {
    "Content-Type": "application/json",
  };
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      ...defaultHeaders,
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
}

export default updateUser;
