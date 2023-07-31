//TODO 1. Проверяем что подключили скрипт и он работает
console.log('Hello');

//TODO 2. Делаем выборку DOM элементов
// найдем нашу кнопку открытия модального окна
let popupOpenButtonElement = document.querySelector('.profile__pencil');
// console.log(popupOpenButtonElement);

// найдем модальное окно
let popupElement = document.querySelector('.popup');
// console.log(popupElement);

// кнопка закрытия модального окна
// ищем ВНУТРИ попапа
let popupCloseButtonElement = popupElement.querySelector('.popup__close');
// console.log(popupCloseButtonElement);

function togglePopup() {
  console.log('togglePopup');
  popupElement.classList.toggle('popup_is-opened');
  // toggle
  // если класс навешен - убери его
  // если класса нет - добавь его
}
//присваиваю значение функции togglePopup
popupOpenButtonElement.addEventListener('click', togglePopup);
popupCloseButtonElement.addEventListener('click', togglePopup);

// Находим форму в DOM
let formElement = popupElement.querySelector('.popup__container');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__form_type_name');
let jobInput = formElement.querySelector('.popup__form_type_job');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  // Получите значение полей jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
  const profileName = document.querySelector(".profile__name");
  const profileText = document.querySelector(".profile__text");
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

// ищем внутри попапа кнопку сохранить
let popupSave = formElement.querySelector('.popup__save');
//присваиваю значение функции togglePopup
popupSave.addEventListener('click', togglePopup);

