import { identificator, baseUrl, token } from "./constants.js";

class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _getResult(res) {
    // Если ответ пришел, возвращаем промис
    // тела ответа в формате JSON

    if (res.ok) {
      return res.json();
    }
    // Если же пришла ошибка, то отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Получение начального набора карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/v1/${identificator}/cards`, {
      headers: this._headers,
    }).then((res) => {
      return this._getResult(res);
    });
  }

  register(email, password) {
    return fetch(`https://auth.nomoreparties.co/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then((res) => {
      return this._getResult(res);
    });
  }

  login(email, password) {
    return fetch(`https://auth.nomoreparties.co/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then((res) => {
      return this._getResult(res);
    });
  }

  loginByToken = (token) => {
    return fetch(`https://auth.nomoreparties.co/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then((res) => {
      return this._getResult(res);
    });
  } 

  // Получение информации о пользователе
  getUserInfo() {
    return fetch(`${this._url}/v1/${identificator}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      return this._getResult(res);
    });
  }

  // Отправка отредактированной информации о пользователе
  editUserInfo(name, about) {
    console.log("name", name);
    console.log("about", about);
    return fetch(`${this._url}/v1/${identificator}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      // console.log('check1');
      return this._getResult(res);
    });
  }

  editUserAvatar(avatarUrl) {
    return fetch(`${this._url}/v1/${identificator}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    }).then((res) => {
      return this._getResult(res);
    });
  }

  addCard({ name, link }) {
    return fetch(`${this._url}/v1/${identificator}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      return this._getResult(res);
    });
  }

  likeCard(cardId) {
    return fetch(`${this._url}/v1/${identificator}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._getResult(res);
    });
  }

  dislikeCard(cardId) {
    return fetch(`${this._url}/v1/${identificator}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._getResult(res);
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.dislikeCard(cardId) : this.likeCard(cardId);
  }

  // Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/v1/${identificator}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._getResult(res);
    });
  }
}

export default new Api({
  baseUrl: `${baseUrl}`,
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
});
