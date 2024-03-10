import '../pages/index.css';
import { createCard, changeLike, handleDeleteCard } from '../components/card.js';
import { openPopup, closePopup, closePopupClickOverlay } from '../components/modal.js';
import { enableValidation, clearValidation } from '../components/validation.js';
import {
  getUserInfo, getInitialCards, saveUserData,
  saveNewCardData, saveUserPicture
} from '../components/api.js';

// Конфигурационный объект для валидации формы
const config = {
  formSelector: ".popup__forms",
  inputSelector: ".popup__form",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_type_invalid",
  inputErrorClass: "popup__form_type_invalid",
};

//общие
const cardsContainer = document.querySelector('.cards');

//попап с профилем
const profileImage = document.querySelector('.profile__avatar');
const profilePopup = document.querySelector("#profile"); //попап
const buttonOpenProfilePopup = document.querySelector(".profile__pencil"); //кнопка открытия  попапа
const popupProfileCloseButton = profilePopup.querySelectorAll(".popup__close"); //кнопка закрытия попапа
//ищем профайл
const profileForm = profilePopup.querySelector(".popup__forms"); //находим форму
const nameInput = profileForm.querySelector(".popup__form_type_name"); //инпут имя
const jobInput = profileForm.querySelector(".popup__form_type_job"); //инпут профессия
const profileFormSubmitButton = profilePopup.querySelector(".popup__save"); //кнопка сохранить
const profileName = document.querySelector(".profile__name");
const profileText = document.querySelector(".profile__text");
//добавить карточку
const cardPopup = document.querySelector("#cards"); //попап
const buttonOpenAddCardPopup = document.querySelector(".profile__plus"); //кнопка открытия  попапа
const popupCardCloseButton = cardPopup.querySelector(".popup__close"); //кнопка закрытия попапа
const cardForm = cardPopup.querySelector(".popup__forms"); //находим форму
const popupCardInputName = cardForm.querySelector(".popup__form_type_title"); //инпут название
const popupCardInputLink = cardForm.querySelector(".popup__form_type_link"); //инпут ссылка
//Попап открытия изображения
const popupImage = document.querySelector('.popup_overlay');  //попап с картинкой
const popupImagePhoto = popupImage.querySelector('.popup__photo');  //выбрали картинку
const popupImageText = popupImage.querySelector('.popup__image-name');  //выбрали подпись
const popupPictureCloseButton = popupImage.querySelector('.popup__close'); //кнопка закрытия попапа
//Попап изменить аватар
const profileEditAvatarButton = document.querySelector('.profile__edit-avatar'); //кнопка изменить аватар
const popupUpdatePicture = document.querySelector('.popup_type_update-pic'); //попап изменить аватар
const popupFormUpdatePicture = document.querySelector('form[name="update-pic"]'); //форма изменить аватар
const popupInputPictureUrl = popupFormUpdatePicture.querySelector('.popup__input_type_picture-url'); //инпут ссылка на новый аватар

// Переменная для хранения ID пользователя
let userId;

// Обработчик изменения лайка на карточке
function changeLikeHandler(cardId, cardLikeCountElement, cardLikeButton) {
  // Вызываем функцию изменения лайка из внешнего модуля, передавая необходимые параметры
  changeLike(cardId, cardLikeCountElement, cardLikeButton);
}

// Функция добавления карточки в контейнер
function addCard(cardElement) {
  // Используем метод append для добавления карточки в конец контейнера
  cardsContainer.append(cardElement);
}

// Функция добавления новой карточки в начало контейнера
function addNewCard(cardData, deleteHandler, likeHandler, imageHandler, userId) {
  // Создаем новую карточку, используя функцию createCard с переданными параметрами
  const card = createCard(cardData, deleteHandler, likeHandler, imageHandler, userId);
  // Используем метод prepend для добавления новой карточки в начало контейнера
  cardsContainer.prepend(card);
}

// Функция отображения информации о пользователе
function renderUserInfo(userData) {
  // Устанавливаем текстовое содержимое элемента profileName равным имени пользователя
  profileName.textContent = userData.name;
  // Устанавливаем текстовое содержимое элемента profileText равным информации о пользователе
  profileText.textContent = userData.about;
  // Устанавливаем фоновое изображение элемента profileImage в виде URL изображения аватара пользователя
  profileImage.style.backgroundImage = `url(${userData.avatar})`;
}

// Функция отображения карточек на странице
function renderCards(initialCardsData) {
  // Итерируем по массиву карточек и создаем для каждой карточки элемент
  initialCardsData.forEach(cardData => {
    // Создаем элемент карточки, используя функцию createCard с переданными параметрами
    const cardElement = createCard(cardData, handleDeleteCard, changeLikeHandler, openImagePopup, userId);
    // Добавляем созданный элемент карточки в контейнер cardsContainer
    addCard(cardElement);
  });
}

// Функция открытия попапа изменения аватара
function openUpdatePicturePopup() {
  // Очищаем сообщения об ошибках валидации для формы изменения аватара
  clearValidation(popupFormUpdatePicture, config);
  // Открываем попап изменения аватара
  openPopup(popupUpdatePicture);
}

// Функция открытия попапа редактирования профиля
function openEditPopup() {
  // Очищаем сообщения об ошибках валидации для формы редактирования профиля
  clearValidation(profileForm, config);
  // Устанавливаем значение инпута имени равным текущему имени пользователя
  nameInput.value = profileName.textContent;
  // Устанавливаем значение инпута профессии равным текущей информации о пользователе
  jobInput.value = profileText.textContent;
  // Открываем попап редактирования профиля
  openPopup(profilePopup);
}

// Функция открытия попапа добавления новой карточки
function openNewCardPopup() {
  // Очищаем сообщения об ошибках валидации для формы добавления новой карточки
  clearValidation(cardForm, config);
  // Открываем попап добавления новой карточки
  openPopup(cardPopup);
}

// Функция открытия попапа с изображением карточки
function openImagePopup(cardData) {
  // Устанавливаем источник изображения в попапе равным URL изображения карточки
  popupImagePhoto.src = cardData.link;
  // Устанавливаем альтернативный текст изображения в попапе равным названию карточки
  popupImagePhoto.alt = cardData.name;
  // Устанавливаем текст подписи к изображению в попапе равным названию карточки
  popupImageText.textContent = cardData.name;
  // Открываем попап с изображением карточки
  openPopup(popupImage);
}


// Обработчик отправки формы изменения аватара
function handleFormSubmitUpdatePicture(evt) {
  // Отменяем стандартное поведение формы (перезагрузка страницы)
  evt.preventDefault();
  // Устанавливаем текст кнопки отправки формы в "Сохранение..."
  profileFormSubmitButton.textContent = 'Сохранение...';
  // Создаем объект с данными для обновления аватара пользователя
  const pictureData = {
    avatar: popupInputPictureUrl.value
  };
  // Отправляем запрос на сервер для обновления аватара
  saveUserPicture(pictureData)
    .then(() => {
      // Обновляем фоновое изображение аватара в профиле пользователя
      profileImage.style.backgroundImage = `url(${popupInputPictureUrl.value})`;
      // Закрываем попап изменения аватара
      closePopup(popupUpdatePicture);
      // Сбрасываем значения полей формы изменения аватара
      popupFormUpdatePicture.reset();
      // Очищаем сообщения об ошибках валидации для формы изменения аватара
      clearValidation(popupFormUpdatePicture, config);
    })
    .catch((error) => {
      // Обрабатываем ошибку при запросе и выводим ее в консоль
      console.log(`Ошибка: ${error}`);
    })
    .finally(() => {
      // Восстанавливаем текст кнопки отправки формы в "Сохранить"
      profileFormSubmitButton.textContent = 'Сохранить';
    });
}

// Обработчик отправки формы редактирования профиля
function handleFormSubmitEdit(evt) {
  // Отменяем стандартное поведение формы (перезагрузка страницы)
  evt.preventDefault();
  // Устанавливаем текст кнопки отправки формы в "Сохранение..."
  profileFormSubmitButton.textContent = 'Сохранение...';
  // Получаем новые значения из полей формы редактирования профиля
  const newName = nameInput.value;
  const newJob = jobInput.value;
  // Отправляем запрос на сервер для обновления данных профиля пользователя
  saveUserData(newName, newJob)
    .then(() => {
      // Обновляем текстовое содержимое элементов с именем и профессией пользователя
      profileName.textContent = newName;
      profileText.textContent = newJob;
      // Закрываем попап редактирования профиля
      closePopup(profilePopup);
      // Очищаем сообщения об ошибках валидации для формы редактирования профиля
      clearValidation(profileForm, config);
    })
    .catch((error) => {
      // Обрабатываем ошибку при запросе и выводим ее в консоль
      console.log(`Ошибка: ${error}`);
    })
    .finally(() => {
      // Восстанавливаем текст кнопки отправки формы в "Сохранить"
      profileFormSubmitButton.textContent = 'Сохранить';
    });
}


// Обработчик отправки формы добавления новой карточки
function handleFormSubmitNewCard(evt) {
  // Отмена стандартного поведения формы (перезагрузка страницы)
  evt.preventDefault();

  // Установка текста кнопки во время выполнения запроса
  profileFormSubmitButton.textContent = 'Сохранение...';

  // Сбор данных о новой карточке из инпутов
  const cardDataNew = {
    name: popupCardInputName.value,
    link: popupCardInputLink.value
  };

  // Отправка данных о новой карточке на сервер
  saveNewCardData(cardDataNew)
    .then((newCardData) => {
      // Добавление новой карточки на страницу
      addNewCard(newCardData, handleDeleteCard, changeLike, openImagePopup, userId);

      // Закрытие попапа добавления новой карточки
      closePopup(cardPopup);

      // Сброс значений формы добавления новой карточки
      cardForm.reset();

      // Очистка валидации формы добавления новой карточки
      clearValidation(cardForm, config);
    })
    .catch((error) => {
      // Обработка ошибок при отправке данных на сервер
      console.log(`Ошибка: ${error}`);
    })
    .finally(() => {
      // Восстановление текста кнопки после выполнения запроса
      profileFormSubmitButton.textContent = 'Сохранить';
    });
}

// Обработчики закрытия попапов
popupProfileCloseButton.forEach(button => {
  // Нахождение ближайшего попапа и добавление обработчика клика на оверлей
  const popup = button.closest('.popup');
  popup.addEventListener('mousedown', closePopupClickOverlay);
  // Добавление обработчика клика на кнопку закрытия попапа
  button.addEventListener('click', () => closePopup(popup));
});

// Слушатель отправки формы редактирования профиля
profileForm.addEventListener('submit', handleFormSubmitEdit);

// Слушатель отправки формы добавления новой карточки
cardForm.addEventListener('submit', handleFormSubmitNewCard);

// Слушатель отправки формы изменения аватара
popupFormUpdatePicture.addEventListener('submit', handleFormSubmitUpdatePicture);

// Слушатель открытия попапа редактирования профиля
buttonOpenProfilePopup.addEventListener('click', openEditPopup);

// Слушатель открытия попапа добавления новой карточки
buttonOpenAddCardPopup.addEventListener('click', openNewCardPopup);

// Слушатель открытия попапа изменения аватара
profileEditAvatarButton.addEventListener('click', openUpdatePicturePopup);

// Получение данных о карточках и пользователе с сервера
Promise.all([getInitialCards(), getUserInfo()])
  .then(([initialCardsData, userData]) => {
    // Отображение информации о пользователе
    renderUserInfo(userData);

    // Сохранение идентификатора пользователя
    userId = userData._id;

    // Отображение карточек на странице
    renderCards(initialCardsData);
  })
  .catch((error) => {
    // Обработка ошибок при получении данных с сервера
    console.log(`Ошибка: ${error}`);
  });

// Включение валидации форм на странице
enableValidation(config);
