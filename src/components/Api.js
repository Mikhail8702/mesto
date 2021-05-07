export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(this._url + 'users/me', {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse);

  }

  getInitialCards() {
    return fetch(this._url + 'cards', {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse);

  }

  editProfileData(data) {
    return fetch(this._url + 'users/me', {
      method:'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data['profile-input-name'],
        about: data['job-input-name']

      })
    })
    .then(this._checkResponse);

  }

  createNewCard(data) {
    return fetch(this._url + 'cards', {
      method:'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data['input-card-add-name'],
        link: data['input-card-add-link']

      })
    })
    .then(this._checkResponse);


  }

  deleteCard(id) {
    return fetch(this._url + 'cards/'+ id, {
      method:'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse);


  }

  addLike(id) {
    return fetch(this._url + 'cards/likes/'+ id, {
      method:'PUT',
      headers: this._headers,
    })
    .then(this._checkResponse);


  }
  removeLike(id) {
    return fetch(this._url + 'cards/likes/'+ id, {
      method:'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse);

  }

  editProfileAva(avatarUrl) {

    return fetch(this._url + 'users/me/avatar', {
      method:'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl['input-avatar-link'],

      })
    })
    .then(this._checkResponse);

  }

}

