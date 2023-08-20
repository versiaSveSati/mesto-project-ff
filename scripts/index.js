
//общие
const cardsList = document.querySelector('.cards');
const cardTemplate = document.querySelector('#elements').content;

//попап с профилем
const popup = document.querySelector("#profile"); //попап
const popupOpenButtonElement = document.querySelector(".profile__pencil"); //кнопка открытия  попапа
const popupProfileCloseButton = popup.querySelector(".popup__close"); //кнопка закрытия попапа
//ищем профайл
const formElement = popup.querySelector(".popup__forms"); //находим форму
const nameInput = formElement.querySelector(".popup__form_type_name"); //инпут имя
const jobInput = formElement.querySelector(".popup__form_type_job"); //инпут профессия
const saveButton = popup.querySelector(".popup__save"); //кнопка сохранить
//добавить карточку
const cardPopup = document.querySelector("#cards"); //попап
const profilePlus = document.querySelector(".profile__plus"); //кнопка открытия  попапа
const addCardPopupCloseButton = cardPopup.querySelector(".popup__close"); //кнопка закрытия попапа
const popupCardForms = cardPopup.querySelector(".popup__forms"); //находим форму
const popupCardInputName = popupCardForms.querySelector(".popup__form_type_title"); //инпут название
const popupCardInputLink = popupCardForms.querySelector(".popup__form_type_link"); //инпут ссылка
const buttonSave = popupCardForms.querySelector(".popup__create"); //кнопка создать




//функция для открытия и закрытия попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
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

profilePlus.addEventListener("click", function () {
  openPopup(cardPopup)
});
addCardPopupCloseButton.addEventListener("click", function () {
  closePopup(cardPopup)
});



//клонировать карточку
function createCard(elements) {
  const cardElements = cardTemplate.querySelector('.card').cloneNode(true); //клонировали св-ва
  const cardPhoto = cardElements.querySelector('.card__photo'); //нашли картинку и сохранили в переменную
  const buttonCardDel = cardElements.querySelector('.card__button'); //выбрать кнопку удаления
  cardPhoto.src = elements.link; //добавить ссылку
  cardPhoto.alt = elements.name; //добавить альт
  cardElements.querySelector('.card__text').textContent = elements.name; //добывить название
  cardElements.querySelector('.card__like').addEventListener('click', function(evt) { //выбрать лайк
    evt.Target.classList.toggle('.card__like_active') // переключить лайк
});

buttonCardDel.addEventListener('click', deletCard); //слушатель 

return cardElements;
}

// создание всех 6-ти карточек
initialCards.forEach(function(elements) {
  const card = createCard(elements);
  renderCard(card);
});

//Добавить карточку в разметку
function renderCard(card) {
  cardsList.append(card);
}

//создать новую карточку
function addCardNew(cardNew) {
const newCard = createCard(cardNew);
cardsList.prepend(newCard);
}

//удаление карточек
function deletCard (event) {
  const listCardDel = event.target.closest('.card'); //нашли родителя
  listCardDel.remove(); //удалить карточку
}





// //функция добавления карточек
// function addCardForm(evt) {
//   evt.preventDefault();
//   const cardAdd = { name: cardName.value, link: cardLink.value };
//   evt.target.reset();
//   prependCardToGallery(cardAdd);
// }

// //вызоваем функцию добавленя карточек; закрываем форму
// formCard.addEventListener("submit", addCardForm);
// cardSaveButton.addEventListener("click", function () {
//   closePopup(popupCard)
// });







// //создание первоначального списка карточек
// function renderInitialCards() {
//   //для кадого эллемента массива
//   initialCards.forEach((cardAdd) => {
//     //создаем карточку
//     appendCardToGallery(cardAdd);
//   });
// }

// //функция создания карточки
// function createCardElement(cardAdd) {
//   const card = cardTemplate.querySelector(".card").cloneNode(true);
//   card.querySelector(".card__photo").src = cardAdd.link;
//   card.querySelector(".card__photo").alt = cardAdd.name;
//   card.querySelector(".card__text").textContent = cardAdd.name;

//   addListenersToCard(card, cardAdd);
//   return card;
// }

// //добавляем карточку в начало 
// function prependCardToGallery(cardAdd) {
//   //создаем карточку
//   const cardElement = createCardElement(cardAdd);

//   //добавляем карточку 
//   gallery.prepend(cardElement);
// }

// // функциональность карточек
// function addListenersToCard(card, cardAdd) {
//   //лайки
//   card.querySelector(".card__like").addEventListener("click", function (event) {
//     event.target.classList.toggle("card__like_active");
//   });

//   //удаление карточки
//   card.querySelector(".card__button").addEventListener("click", function () {
//     card.remove();
//   });
// }






// renderInitialCards();
















