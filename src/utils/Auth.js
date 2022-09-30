export const BASE_URL = "https://reqres.in/api"; //

export const register = ({ password, email }) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => data);
};

export const authorize = ({ password, email }) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log(`Упс, ошибка ${err}`);
    });
};
