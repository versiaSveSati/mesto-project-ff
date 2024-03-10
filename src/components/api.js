// общие данные
const apiConfig = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-7',
    headers: {
      authorization: '7f6ce425-c311-42fb-8684-c71cb8d86382',
      'Content-Type': 'application/json',
    },
  };
  
  // проверка ответа от сервера
  function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  
  //1. Загрузка информации о пользователе с сервера
  export function getUserInfo() {
    return fetch(`${apiConfig.baseUrl}/users/me`, {
      method: 'GET',
      headers: apiConfig.headers
    })
    .then(checkResponse)
  }
  
  //2. Загрузка карточек с сервера
  export function getInitialCards() {
    return fetch(`${apiConfig.baseUrl}/cards`, {
      method: 'GET',
      headers: apiConfig.headers
    })
    .then(res => checkResponse(res))
  }
   
  //3. Редактирование профиля
  export function saveUserData(newName, newJob) {
    return fetch(`${apiConfig.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: apiConfig.headers,
      body: JSON.stringify({
        name: newName,
        about: newJob
      })
    })
    .then(res => checkResponse(res))
  }
  
  // //4. Добавление новой карточки
  export function saveNewCardData(cardData) {
    return fetch(`${apiConfig.baseUrl}/cards`, {
      method: 'POST',
      headers: apiConfig.headers,
      body: JSON.stringify(cardData)
    })
    .then(res => checkResponse(res))
  }
  
  //5. Постановка и снятие лайка
  export function handleSetLike(cardId) {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: apiConfig.headers,
    })
    .then(res => checkResponse(res))
  }
  
  export function handleRemoveLike(cardId) {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: apiConfig.headers,
    })
    .then(res => checkResponse(res))
  }
  
  //6. Удаление карточки
  export function deleteCardData(cardId) {
    return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: apiConfig.headers,
    })
    .then(res => checkResponse(res))
  }
  
  //7. Обновление аватара пользователя
  export function saveUserPicture(pictureData) {
    return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: apiConfig.headers,
      body: JSON.stringify(pictureData)
    })
    .then(res => checkResponse(res))
  }