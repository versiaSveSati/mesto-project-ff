// найдем модальное окно
let popupElement = document.querySelector('.popup');
// найдем кнопку открытия модального окна
let popupOpenButtonElement = document.querySelector('.profile__pencil');
// найдем кнопку закрытия модального окна, ищем ВНУТРИ попапа
let popupCloseButtonElement = popupElement.querySelector('.popup__close');
//Находим форму
let formElement = popupElement.querySelector('.popup__forms');
// Выбираем элементы, куда должны быть вставлены значения полей
let profileName = document.querySelector('.profile__name');
let profileText = document.querySelector('.profile__text');
// Находим поля формы
let nameInput = formElement.querySelector('.popup__form_type_name');
let jobInput = formElement.querySelector('.popup__form_type_job');

//функция открытия 
function popupOpen() {
  popupElement.classList.add('popup_opened');
}

function handleProfileEditClick() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
  popupOpen()
}

//функция закрытия 
function popupClose() {
  popupElement.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit(evt) {
  // Эта строчка отменяет стандартную отправку формы, так мы можем определить свою логику отправки.
  evt.preventDefault();
  // Получите значение полей jobInput и nameInput из свойства value
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
  // вызываем функцию закрытия попапа
  popupClose();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

//добавляю слушателя на открытие
popupOpenButtonElement.addEventListener('click', handleProfileEditClick);
//добавляю слушателя на закрытие
popupCloseButtonElement.addEventListener('click', popupClose);



