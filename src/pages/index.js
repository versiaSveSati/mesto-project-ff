// Импорт стилей и модулей
import '../pages/index.css';
import { initialCards } from '../scripts/cards.js';
import { createCard } from '../components/card.js';
import { openPopup, closePopup } from '../components/modal.js';
import { enableValidation, clearValidation } from '../components/validation.js';
import { 
  getUserInfo, getInitialCards, saveUserData,
  saveNewCardData, saveUserPicture
} from '../components/api.js';

// Общие элементы страницы
const cardsContainer = document.querySelector('.cards');
const profilePopup = document.querySelector("#profile");
const buttonOpenProfilePopup = document.querySelector(".profile__pencil");
const popupProfileCloseButton = profilePopup.querySelector(".popup__close");
const profileForm = profilePopup.querySelector(".popup__forms");
const nameInput = profileForm.querySelector(".popup__form_type_name");
const jobInput = profileForm.querySelector(".popup__form_type_job");
const profileFormSubmitButton = profilePopup.querySelector(".popup__save");
const profileName = document.querySelector(".profile__name");
const profileText = document.querySelector(".profile__text");
const cardPopup = document.querySelector("#cards");
const buttonOpenAddCardPopup = document.querySelector(".profile__plus");
const popupCardCloseButton = cardPopup.querySelector(".popup__close");
const cardForm = cardPopup.querySelector(".popup__forms");
const popupCardInputName = cardForm.querySelector(".popup__form_type_title");
const popupCardInputLink = cardForm.querySelector(".popup__form_type_link");
const popupImage = document.querySelector('.popup_overlay');
const popupImagePhoto = popupImage.querySelector('.popup__photo');
const popupImageText = popupImage.querySelector('.popup__image-name');
const popupPictureCloseButton = popupImage.querySelector('.popup__close');

// Функция-обработчик события открытия модального окна для редактирования профиля
function handleProfileEditClick() {
  // Получаем информацию о пользователе
  getUserInfo()
    .then(userInfo => {
      // Устанавливаем значения в поля ввода
      nameInput.value = userInfo.name;
      jobInput.value = userInfo.about;
      // Открываем попап профиля
      openPopup(profilePopup);
    })
    .catch(error => console.error('Ошибка при получении информации о пользователе:', error));
}

// Отмена стандартной отправки формы попапа редактирования
function handleProfileFormSubmit(evt) {
  // Отменяем стандартное действие формы (отправку)
  evt.preventDefault();

  // Сохраняем новые данные пользователя
  saveUserData(nameInput.value, jobInput.value)
    .then(updatedUserInfo => {
      // Обновляем отображение данных пользователя
      profileName.textContent = updatedUserInfo.name;
      profileText.textContent = updatedUserInfo.about;
      // Закрываем попап профиля
      closePopup(profilePopup);
    })
    .catch(error => console.error('Ошибка при сохранении данных пользователя:', error));
}

// Добавляем обработчик события на форму попапа редактирования профиля
profileForm.addEventListener("submit", handleProfileFormSubmit);

// Создание всех 6-ти карточек
getInitialCards()
  .then(cards => {
    cards.forEach(cardData => {
      // Создаем карточку и добавляем в контейнер
      const card = createCard(cardData, openImagePopup);
      renderCard(card);
    });
  })
  .catch(error => console.error('Ошибка при получении начальных карточек:', error));

// Функция добавления новой карточки
function addCardNew(cardNew) {
  saveNewCardData(cardNew)
    .then(newCardData => {
      // Создаем новую карточку и добавляем в начало контейнера
      const newCard = createCard(newCardData, openImagePopup);
      cardsContainer.prepend(newCard);
    })
    .catch(error => console.error('Ошибка при сохранении данных новой карточки:', error));
}

// Отмена стандартной отправки формы попапа добавления карточек
function handleFormSubmitAddPopup(evt) {
  // Отменяем стандартное действие формы (отправку)
  evt.preventDefault();

  // Создаем объект с данными новой карточки из значений полей ввода
  const cardNew = { name: popupCardInputName.value, link: popupCardInputLink.value };

  // Проверяем, заполнены ли оба поля
  if (!cardNew.name || !cardNew.link) {
    // Если не заполнены, выводим сообщение об ошибке в консоль
    console.error('Введите название и ссылку для карточки');
    // Прекращаем выполнение функции, чтобы форма не отправлялась
    return;
  }

  // Если оба поля заполнены, вызываем функцию добавления новой карточки
  addCardNew(cardNew);

  // Очищаем значения полей ввода
  popupCardInputName.value = '';
  popupCardInputLink.value = '';

  // Закрываем попап добавления карточки
  closePopup(cardPopup);
}

// Добавляем обработчик события на форму попапа добавления карточек
cardPopup.addEventListener('submit', handleFormSubmitAddPopup);

// Конфигурационный объект для валидации формы
const configForm = {
  formSelector: ".popup__forms",
  inputSelector: ".popup__form",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_type_invalid",
  inputErrorClass: "popup__form_type_invalid",
};

// Активировать валидацию для форм с использованием заданной конфигурации
enableValidation(configForm);

// Вызываем clearValidation для формы профиля
clearValidation(profileForm, configForm);

//СЛУШАТЕЛИ
buttonOpenProfilePopup.addEventListener("click", handleProfileEditClick); //открыть попап редактирования

popupProfileCloseButton.addEventListener("click", function () {  //закрыть попап редактирования
  closePopup(profilePopup)
});

buttonOpenAddCardPopup.addEventListener("click", function () { //открыть попап добавить карточку 
  openPopup(cardPopup)
});
popupCardCloseButton.addEventListener("click", function () { //закрыть попап добавить карточку
  closePopup(cardPopup)
});
popupImagePhoto.addEventListener("click", function () {  //открыть попап фото
  openPopup(popupImage)
});
popupPictureCloseButton.addEventListener("click", function () { //закрыть попап фото
  closePopup(popupImage)
});

// Функция открытия модального окна изображения карточки
function openImagePopup(imgSrc, imgText) {
  popupImagePhoto.src = imgSrc;
  popupImagePhoto.alt = imgText;
  popupImageText.textContent = imgText;
  openPopup(popupImage);
}

// Добавить карточку в разметку
function renderCard(card) {
  cardsContainer.append(card);
}
