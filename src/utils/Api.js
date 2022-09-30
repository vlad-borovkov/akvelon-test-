class Api {
  constructor({ domain, token }) {
    this._domain = domain;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${res.status} - ${res.statusText}`);
  }

  makeRequest(url, method = "GET", body) {
    const requestUrl = this._domain + url;
    const jwt = localStorage.getItem("jwt");

    return fetch(requestUrl, {
      method: method,
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(this._checkResponse);
  }

  getUserValue(userId) {
    const infoUsersDefault = `/users/${userId}`;
    return this.makeRequest(infoUsersDefault);
  }

  getUsersFromServer() {
    const cardsFromServer = "/users";
    return this.makeRequest(cardsFromServer);
  }

  getAllUsersFromServer(pageNumber) {
    const infoUsersDefault = `/users?page=${pageNumber}`;
    return this.makeRequest(infoUsersDefault);
  }
}

export const api = new Api({
  domain: "https://reqres.in/api", //
});
