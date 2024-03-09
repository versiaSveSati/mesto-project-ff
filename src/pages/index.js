
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

let userId;

function changeLikeHandler(cardId, cardLikeCountElement, cardLikeButton) {
  changeLike(cardId, cardLikeCountElement, cardLikeButton);
}

function addCard(cardElement) {
  cardsContainer.append(cardElement);
}

function addNewCard(cardData, deleteHandler, likeHandler, imageHandler, userId) {
  const card = createCard(cardData, deleteHandler, likeHandler, imageHandler, userId);
  cardsContainer.prepend(card);
}

function renderUserInfo(userData) {
  profileName.textContent = userData.name;
  profileText.textContent = userData.about;
  profileImage.style.backgroundImage = `url(${userData.avatar})`;
}

function renderCards(initialCardsData) {
  initialCardsData.forEach(cardData => {
    const cardElement = createCard(cardData, handleDeleteCard, changeLikeHandler, openImagePopup, userId);
    addCard(cardElement);
  });
}

function openUpdatePicturePopup() {
  clearValidation(popupFormUpdatePicture, config);
  openPopup(popupUpdatePicture);
}

function openEditPopup() {
  clearValidation(profileForm, config);
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
  openPopup(profilePopup);
}

function openNewCardPopup() {
  clearValidation(cardForm, config);
  openPopup(cardPopup);
}

function openImagePopup(cardData) {
  popupImagePhoto.src = cardData.link;
  popupImagePhoto.alt = cardData.name;
  popupImageText.textContent = cardData.name;
  openPopup(popupImage);
}

function handleFormSubmitUpdatePicture(evt) {
  evt.preventDefault();
  profileFormSubmitButton.textContent = 'Сохранение...'
  const pictureData = {
    avatar: popupInputPictureUrl.value
  }
  saveUserPicture(pictureData)
  .then(() => {
    profileImage.style.backgroundImage = `url(${popupInputPictureUrl.value})`;
    closePopup(popupUpdatePicture);
    popupFormUpdatePicture.reset();
    clearValidation(popupFormUpdatePicture, config);
  })
  .catch((error) => {
    console.log(`Ошибка: ${error}`);
  })
  .finally(() => {
    profileFormSubmitButton.textContent = 'Сохранить';
  });
}

function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  profileFormSubmitButton.textContent = 'Сохранение...';
  const newName = nameInput.value;
  const newJob = jobInput.value;
  saveUserData(newName, newJob)
  .then(() => {
    profileName.textContent = newName;
    profileText.textContent = newJob;
    closePopup(profilePopup);
    clearValidation(profileForm, config);
  })
  .catch((error) => {
    console.log(`Ошибка: ${error}`);
  })
  .finally(() => {
    profileFormSubmitButton.textContent = 'Сохранить';
  });
}

function handleFormSubmitNewCard(evt) {
  evt.preventDefault();
  profileFormSubmitButton.textContent = 'Сохранение...'
  const cardDataNew = {
    name: popupCardInputName.value,
    link: popupCardInputLink.value
  }
  saveNewCardData(cardDataNew)
  .then((newCardData) => {
    addNewCard(newCardData, handleDeleteCard, changeLike, openImagePopup, userId);
    closePopup(cardPopup);
    cardForm.reset();
    clearValidation(cardForm, config);
  })
  .catch((error) => {
    console.log(`Ошибка: ${error}`);
  })
  .finally(() => {
    profileFormSubmitButton.textContent = 'Сохранить';
  });
}

popupProfileCloseButton.forEach(button => {
  const popup = button.closest('.popup');
  popup.addEventListener('mousedown', closePopupClickOverlay);
  button.addEventListener('click', () => closePopup(popup));
})

profileForm.addEventListener('submit', handleFormSubmitEdit);
cardForm.addEventListener('submit', handleFormSubmitNewCard);
popupFormUpdatePicture.addEventListener('submit', handleFormSubmitUpdatePicture);
buttonOpenProfilePopup.addEventListener('click', openEditPopup);
buttonOpenAddCardPopup.addEventListener('click', openNewCardPopup);
profileEditAvatarButton.addEventListener('click', openUpdatePicturePopup);

Promise.all([getInitialCards(), getUserInfo()])
.then(([initialCardsData, userData]) => {
  renderUserInfo(userData);
  userId = userData._id
  renderCards(initialCardsData);
})
.catch((error) => {
  console.log(`Ошибка: ${error}`);
})

enableValidation(config);
