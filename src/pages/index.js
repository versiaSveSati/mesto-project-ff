import '../pages/index.css';
import { initialCards } from '../scripts/cards.js';
import { createCard } from '../components/card.js';
import { openPopup, closePopup } from '../components/modal.js';

//общие
const cardsContainer = document.querySelector('.cards');


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
const popupImageText = document.querySelector('.popup_overlay');  //попап с картинкой
const popupImagePhoto = popupImageText.querySelector('.popup__photo');  //выбрали картинку
const text = popupImageText.querySelector('.popup__image-name');  //выбрали подпись
const popupPictureCloseButton = popupImageText.querySelector('.popup__close'); //кнопка закрытия попапа

//функция-обработчик события открытия модального окна для редактирования профиля  
function handleProfileEditClick() {
  nameInput.value = profileName.textContent; //Значение поля ввода имени (nameInput) устанавливается равным тексту, который находится в элементе с классом profileName. profileName - это элемент, содержащий текущее имя пользователя.
  jobInput.value = profileText.textContent; //Значение поля ввода профессии (jobInput) устанавливается равным тексту, который находится в элементе с классом profileText. profileText - это элемент, содержащий текущую информацию о профессии пользователя
  openPopup(profilePopup) // Вызывается функция openPopup с аргументом profilePopup. эта функция отвечает за открытие модального окна. profilePopup - это переменная, содержащая ссылку на модальное окно профиля.
}

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
  text.textContent = imgText;  //подставили название
  openPopup(popupImageText);
}

// создание всех 6-ти карточек
initialCards.forEach(function (elements) {
  const card = createCard(elements);
  renderCard(card);
});

//Добавить карточку в разметку
function renderCard(card) {
  cardsContainer.append(card);
}

//создать новую карточку
function addCardNew(cardNew) {
  const newCard = createCard(cardNew);
  cardsContainer.prepend(newCard);
}

//отмена стандартной отправки формы попапа добавления карточек
function handleFormSubmitAddPopup(evt) {
  evt.preventDefault();
  const cardNew = { name: popupCardInputName.value, link: popupCardInputLink.value };  //передать аргументы
  addCardNew(cardNew);  //вызвать функцию создания новой карточки
  popupCardInputName.value = '';
  popupCardInputLink.value = '';
  closePopup(cardPopup);  //дополнительно закрыть попап
}
cardPopup.addEventListener('submit', handleFormSubmitAddPopup);

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
  openPopup(popupImageText)
});
popupPictureCloseButton.addEventListener("click", function () { //закрыть попап фото
  closePopup(popupImageText)
});





















