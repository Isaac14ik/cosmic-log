import { API_BASE_URL } from './constants';

class ThirdPartyApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getArticles(keyword) {
    return fetch(`${this._baseUrl}/articles/?search=${keyword}`).then(
      this._checkResponse
    );
  }
}

const thirdPartyApi = new ThirdPartyApi({
  baseUrl: API_BASE_URL,
});

export default thirdPartyApi;