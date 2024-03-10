// Переменная для хранения ссылки на текущий открытый попап
let openedPopup = null;

// Функция открытия попапа
export function openPopup(popup) {
  // Если уже открыт попап, закрываем его перед открытием нового
  if (openedPopup) {
    closePopup(openedPopup);
  }

  // Добавляем класс, отвечающий за открытие попапа
  popup.classList.add("popup_opened");
  // Добавляем слушатели закрытия для нового попапа
  addCloseListeners(popup);
  // Запоминаем текущий открытый попап
  openedPopup = popup;
}

// Функция для удаления слушателей закрытия попапа
function removeCloseListeners(popup) {
  // Находим все кнопки закрытия в попапе
  const closeButtons = popup.querySelectorAll(".popup__close");
  // Удаляем слушатели для каждой кнопки
  closeButtons.forEach((button) => {
    button.removeEventListener("click", closePopup);
  });
  // Удаляем слушатель для закрытия по клику на оверлей
  popup.removeEventListener('mousedown', closePopupClickOverlay);
}

// Функция для добавления слушателей закрытия попапа
function addCloseListeners(popup) {
  // Находим все кнопки закрытия в попапе
  const closeButtons = popup.querySelectorAll(".popup__close");
  // Добавляем слушатели для каждой кнопки
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => closePopup(popup));
  });
  // Добавляем слушатель для закрытия по клику на оверлей
  popup.addEventListener('mousedown', closePopupClickOverlay);
}

// Функция закрытия попапа
export function closePopup(popup) {
  // Убираем класс, отвечающий за открытие попапа
  popup.classList.remove("popup_opened");
  // Удаляем слушатели закрытия для текущего попапа
  removeCloseListeners(popup);
  // Сбрасываем текущий открытый попап
  openedPopup = null;
}

// Функция для закрытия попапа по клику на оверлей
export function closePopupClickOverlay(evt) {
  // Если клик произошел по оверлею (за пределами контента попапа)
  if (evt.target.classList.contains("popup_opened")) {
    // Закрываем попап
    closePopup(evt.target);
  }
}
