import { API_BASE_URL, API_KEY } from './constants';

class ThirdPartyApi {
  constructor({ baseUrl, apiKey }) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  searchArticles(keyword) {
    // Para evitar que fechas futuras o desfasadas provoquen un Error 401 en el proxy,
    // enviamos la consulta limpia de término y apiKey que el proxy de TripleTen procesa directamente.
    const params = new URLSearchParams({
      q: keyword,
      pageSize: '100',
      apiKey: this._apiKey,
    });

    return fetch(`${this._baseUrl}?${params.toString()}`).then(this._checkResponse);
  }
}

const thirdPartyApi = new ThirdPartyApi({
  baseUrl: API_BASE_URL,
  apiKey: API_KEY,
});

export default thirdPartyApi;