class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка Api _parseResponse: ${res.status}`)
  }


  //===========================================

  // Получение информации о пользователе
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    }).then(res => this._parseResponse(res));
  }
  // Редактирование информации о пользователе
  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then(res => this._parseResponse(res));
  }

  //============================================

  // Редактирование аватара
  editAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(res => this._parseResponse(res));
  }

  //=============================================


  // Получение карточек
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    }).then(res => this._parseResponse(res));
  }
  // Добавление новой карточки через попап
  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(res => this._parseResponse(res));
  }

  //===========================================

  // Меняем статус лайка
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      }).then(res => this._parseResponse(res));
    } else {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      }).then(res => this._parseResponse(res));
    }
  }


  //===========================================

  // Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => this._parseResponse(res));
  }


  //===========================================

  // Аутентификация пользователя
  login(data) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(res => this._parseResponse(res));
  }


  //===========================================

  // Регистрация пользователя
  register(data) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(res => this._parseResponse(res));
  }

  //===========================================

  // Проверка токена пользователя
  setToken(token) {
    this._headers.authorization = token;
  }
}


export const api = new Api({
  url: "https://mesto-backend.juliafox.nomoredomains.club",
  headers: {
    "content-type": "application/json",
    "authorization": "",
  }
});



