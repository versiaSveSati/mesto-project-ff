//импорт из Card.js и validation.js
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './cards.js';

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

//функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupEsc);
}

function handleProfileEditClick() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
  openPopup(profilePopup)
}

//функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupEsc);
}

//зактытие через Esc
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//закрытие попапов через оверлей
const popupList = Array.from(document.querySelectorAll('.popup')); // найти все попапы
popupList.forEach((popup) => { // перебираем элементы массива, каждый записываем в переменную popup
  popup.addEventListener('mouseup', (event) => { // на каждый попап установить слушатель
    const targetClassList = event.target.classList; // записать в переменную класс элемента, на котором произошло событие
    if (targetClassList.contains('popup') || targetClassList.contains('popup__close')) { // если есть класс попапа или кнопка закрыть
      closePopup(popup); // если один из классов присутствует, то закрываем попап
    }
  })
})

//отмена стандартной отправки формы попапа редактирования
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
  closePopup(profilePopup)
}
profileForm.addEventListener("submit", handleProfileFormSubmit);

//Попап открытия изображения на весь экран
function openImagePopup(imgSrc, imgText) {  //открыть попап с изображением
  popupImagePhoto.src = imgSrc;  //подставили ссылку
  popupImagePhoto.alt = imgText;  //подставили альт
  imagetext.textContent = imgText;  //подставили название
  openPopup(popupImageText);
}


//создать новую карточку
function createNewCard(data) {
  const card = new Card(data, '#elements', openImagePopup);
  return card.createCard();
}

// создание всех 6-ти карточек из массива
initialCards.forEach((item) => {
  const newCard = createNewCard(item);
  cardsContainer.append(newCard);
});


//добавить новую карточку
function addCardNew(cardNew) {
  const newCard = createNewCard(cardNew);
  cardsContainer.prepend(newCard);
}



//отмена стандартной отправки формы попапа добавления карточек
function handleFormSubmitAddPopup(evt) {
  evt.preventDefault();
  const cardNew = { name: popupCardInputName.value, link: popupCardInputLink.value };  //передать аргументы
  addCardNew(cardNew);  //вызвать функцию создания новой карточки
  evt.target.reset(); //очистить форму (вместо popupCardInputName.value = ''; popupCardInputLink.value = '';)
  evt.submitter.classList.add('popup__save_type_invalid');  //добавить класс disabled
  closePopup(cardPopup);  //дополнительно закрыть попап
}
cardPopup.addEventListener('submit', handleFormSubmitAddPopup);



//слушатели
buttonOpenProfilePopup.addEventListener("click", handleProfileEditClick); //открыть попап редактирования

buttonOpenAddCardPopup.addEventListener("click", function () { //открыть попап добавить карточку 
  openPopup(cardPopup)
});

//валидация
document.querySelectorAll('form').forEach(formElement => {
  const formValidator = new FormValidator(configForm, formElement);
  formValidator.enableValidation();

  if (formElement.id === 'edit-form') {
    formElement.addEventListener('submit', handleProfileFormSubmit);
  } else if (formElement.id === 'add-form') {
    formElement.addEventListener('submit', handleFormSubmitAddPopup);
  }
});