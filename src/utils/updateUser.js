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
  }).then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(`Error: ${res.status}`);
  });
}

export default updateUser;
