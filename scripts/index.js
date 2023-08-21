
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
const popupCardCloseButton = cardPopup.querySelector(".popup__close"); //кнопка закрытия попапа
const popupCardForms = cardPopup.querySelector(".popup__forms"); //находим форму
const popupCardInputName = popupCardForms.querySelector(".popup__form_type_title"); //инпут название
const popupCardInputLink = popupCardForms.querySelector(".popup__form_type_link"); //инпут ссылка
const buttonSave = popupCardForms.querySelector(".popup__create"); //кнопка создать
//Попап открытия изображения
const popupImage = document.querySelector('.popup_overlay');  //нашли попап с картинкой
const photo = popupImage.querySelector('.popup__photo');  //выбрали картинку
const text = popupImage.querySelector('.popup__image-name');  //выбрали подпись
const popupPictureCloseButton = popupImage.querySelector('.popup__close'); //кнопка закрытия попапа
const cardLike = popupImage.querySelector('.card__like');





//функция для открытия и закрытия попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

//отмена стандартной отправки формы попапа редактирования
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





//клонировать карточку
function createCard(elements) {
  const cardElements = cardTemplate.querySelector('.card').cloneNode(true); //клонировали св-ва
  const cardPhoto = cardElements.querySelector('.card__photo'); //нашли и сохранили картинку в переменную
  const buttonCardDel = cardElements.querySelector('.card__button'); //выбрать кнопку удаления
  cardPhoto.src = elements.link; //добавить ссылку
  cardPhoto.alt = elements.name; //добавить альт
  cardElements.querySelector('.card__text').textContent = elements.name; //добывить название
  cardElements.querySelector('.card__like').addEventListener('click', function(event) { //выбрать лайк
    event.target.classList.toggle('.card__like_active'); // переключить лайк
});
cardElements.querySelector('.card__photo').addEventListener('click', function() {  //выбрали изображение
  openImagePopup(elements.link, elements.name);  //открыли карточку
});

buttonCardDel.addEventListener('click', deletCard); //слушатель удалить картинку

return cardElements;
}


//Попап открытия изображения на весь экран
function openImagePopup(imgSrc, imgText) {  //открыть попап с изображением
  photo.src = imgSrc;  //подставили ссылку
  photo.alt = imgText;  //подставили альт
  text.textContent = imgText;  //подставили название
  openPopup(popupImage);
}
function closeImagePopup() {  //закрыть попап с изображением
  closePopup(popupImage);
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

//отмена стандартной отправки формы попапа добавления карточек
function handleFormSubmitAddPopup (evt) {  
  evt.preventDefault();
  const cardNew = {name: popupCardInputName.value, link: popupCardInputLink.value};  //передать аргументы
  addCardNew(cardNew);  //вызвать функцию создания новой карточки
  popupCardInputName.value = '';
  popupCardInputLink.value = '';
  closePopup(cardPopup);  //дополнительно закрыть попап
}
cardPopup.addEventListener('submit', handleFormSubmitAddPopup);

//слушатели
popupOpenButtonElement.addEventListener("click", function () { //открыть попап редактирования
  openPopup(popup)
});
popupProfileCloseButton.addEventListener("click", function () {  //закрыть попап редактирования
  closePopup(popup)
});

profilePlus.addEventListener("click", function () { //открыть попап добавить карточку 
  openPopup(cardPopup)
});
popupCardCloseButton.addEventListener("click", function () { //закрыть попап добавить карточку
  closePopup(cardPopup)
});
photo.addEventListener("click", function () {  //открыть попап фото
  openPopup(popupImage)
});
popupPictureCloseButton.addEventListener("click", function () { //закрыть попап фото
  closePopup(popupImage)
});





















