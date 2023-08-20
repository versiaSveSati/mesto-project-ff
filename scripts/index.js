//попап с профилем
const popup = document.querySelector("#profile"); //попап
const popupOpenButtonElement = document.querySelector(".profile__pencil"); //кнопка открытия  попапа
const popupProfileCloseButton = popup.querySelector(".popup__close"); //кнопка закрытия попапа
//ищем профайл
const formElement = popup.querySelector(".popup__forms"); //находим форму
const nameInput = formElement.querySelector(".popup__form_type_name"); //инпут имя
const jobInput = formElement.querySelector(".popup__form_type_job"); //инпут профессия
const saveButton = popup.querySelector(".popup__save"); //кнопка сохранить
//попап добавления фото
const popupCard = document.querySelector("#cards"); //попап
const addCardButton = document.querySelector(".profile__plus"); //кнопка открытия  попапа
const addCardPopupCloseButton = popupCard.querySelector(".popup__close"); //кнопка закрытия попапа
//ищем форму добавления карточки
const formCard = popupCard.querySelector(".popup__forms"); //находим форму
const cardName = popupCard.querySelector(".popup__form_type_title"); //инпут название
const cardLink = popupCard.querySelector(".popup__form_type_link"); //инпут ссылка
const cardSaveButton = popupCard.querySelector(".popup__create"); //кнопка создать

//функция для открытия и закрытия попапа
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

//функция для редактирования имени и профессии
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const name = document.querySelector(".profile__name");
  const job = document.querySelector(".profile__text");
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
}

//вызоваем функцию редактирования имени и профессии; закрываем форму
formElement.addEventListener("submit", handleProfileFormSubmit);
saveButton.addEventListener("click", function () {
  closePopup(popup)
});

//слушатели
popupOpenButtonElement.addEventListener("click", function () {
  openPopup(popup)
});
popupProfileCloseButton.addEventListener("click", function () {
  closePopup(popup)
});

addCardButton.addEventListener("click", function () {
  openPopup(popupCard)
});
addCardPopupCloseButton.addEventListener("click", function () {
  closePopup(popupCard)
});

//функция добавления карточек
function addCardForm(evt) {
  evt.preventDefault();
  const cardAdd = { name: cardName.value, link: cardLink.value };
  evt.target.reset();
  prependCardToGallery(cardAdd);
}

//вызоваем функцию добавленя карточек; закрываем форму
formCard.addEventListener("submit", addCardForm);
cardSaveButton.addEventListener("click", function () {
  closePopup(popupCard)
});




//template
const cardTemplate = document.querySelector("#elements").content;
const gallery = document.querySelector(".card");


//создание первоначального списка карточек
function renderInitialCards() {
  //для кадого эллемента массива
  initialCards.forEach((cardAdd) => {
    //создаем карточку
    appendCardToGallery(cardAdd);
  });
}

//функция создания карточки
function createCardElement(cardAdd) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  card.querySelector(".card__photo").src = cardAdd.link;
  card.querySelector(".card__photo").alt = cardAdd.name;
  card.querySelector(".card__text").textContent = cardAdd.name;

  addListenersToCard(card, cardAdd);
  return card;
}

//добавляем карточку в начало 
function prependCardToGallery(cardAdd) {
  //создаем карточку
  const cardElement = createCardElement(cardAdd);

  //добавляем карточку 
  gallery.prepend(cardElement);
}

// функциональность карточек
function addListenersToCard(card, cardAdd) {
  //лайки
  card.querySelector(".card__like").addEventListener("click", function (event) {
    event.target.classList.toggle("card__like_active");
  });

  //удаление карточки
  card.querySelector(".card__button").addEventListener("click", function () {
    card.remove();
  });
}






renderInitialCards();
















