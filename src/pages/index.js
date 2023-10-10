import '../pages/index.css';

//импорт из Card.js и validation.js
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards } from '../scripts/cards.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';


//универсальный конфиг
const configForm = {
  formSelector: ".popup__forms",
  inputSelector: ".popup__form",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_type_invalid",
  inputErrorClass: "popup__form_type_invalid",
};

//общие
const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#elements').content;
const forms = document.querySelectorAll('.popup__forms');

//попап с профилем
const profilePopup = document.querySelector("#profile"); //попап
const buttonOpenProfilePopup = document.querySelector(".profile__pencil"); //кнопка открытия  попапа
const popupProfileCloseButton = profilePopup.querySelector(".popup__close"); //кнопка закрытия попапа
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
const popupImageText = document.querySelector('.popup_overlay');  //нашли попап с картинкой
const popupImagePhoto = popupImageText.querySelector('.popup__photo');  //выбрали картинку
const imagetext = popupImageText.querySelector('.popup__image-name');  //выбрали подпись
const popupPictureCloseButton = popupImageText.querySelector('.popup__close'); //кнопка закрытия попапа

// Информация о пользователе
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__text'
});

// Создание попапа просмотра изображения
const imagePopup = new PopupWithImage('.popup_overlay');
imagePopup.setEventListeners();

//Создание секции для карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item, mode) => {
    const cardElement = createNewCard(item);
    cardList.addItem(cardElement, mode);
  }
}, '.cards');

cardList.renderItems();

//Функция создания новой карточки
function createNewCard(data) {
  const card = new Card(data, '#elements', (imgSrc, imgCaption) => imagePopup.open(imgSrc, imgCaption));
  return card.createCard();
}

// Попапа редактирования профиля
const popupEditProfile = new PopupWithForm('#profile', (formData) => {
  userInfo.setUserInfo(formData.name, formData.profession);
});
popupEditProfile.setEventListeners();

// Попапа добавления карточки
const popupAddCard = new PopupWithForm('#cards', (formData) => {
  const cardData = {
    name: formData.place,
    link: formData.link
  };
  const cardElement = createNewCard(cardData);
  cardList.addItem(cardElement, 'prepend');
});

popupAddCard.setEventListeners();

//Слушатели
buttonOpenProfilePopup.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.info;

  popupEditProfile.open();
});

buttonOpenAddCardPopup.addEventListener('click', () => {
  popupAddCard.open();
});

// Валидация каждой формы
forms.forEach((formElement) => {
  const formValidator = new FormValidator(configForm, formElement);
  formValidator.enableValidation();
});