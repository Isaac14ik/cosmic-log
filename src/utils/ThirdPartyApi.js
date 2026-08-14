class ThirdPartyApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  // Método privado para verificar si la respuesta del servidor es OK
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // Método para buscar artículos / noticias espaciales por término
  searchArticles(keyword) {
    const url = `${this._baseUrl}/articles/?search=${encodeURIComponent(keyword)}&limit=15`;
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }
}

// Instanciamos la API con la URL base del servicio de noticias del espacio
const thirdPartyApi = new ThirdPartyApi({
  baseUrl: 'https://api.spaceflightnewsapi.net/v4',
});

export default thirdPartyApi;