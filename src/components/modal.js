//функция открытия попапа
export function openPopup(profilePopup) {
    profilePopup.classList.add("popup_opened");
    document.addEventListener('keydown', closePopupEsc);
}

//функция закрытия попапа
export function closePopup(profilePopup) {
    profilePopup.classList.remove("popup_opened");
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
export function closePopupClickOverlay() {
const popupList = Array.from(document.querySelectorAll('.popup')); // найти все попапы, преобразовать в массив
popupList.forEach((popup) => { // перебираем элементы массива, каждый записываем в переменную popup
    popup.addEventListener('mouseup', (event) => { // на каждый попап установить слушатель
        const targetClassList = event.target.classList; // записать в переменную класс элемента, на котором произошло событие
        if (targetClassList.contains('popup') || targetClassList.contains('popup__close')) { // если есть класс попапа или кнопка закрыть
            closePopup(popup); // если один из классов присутствует, то закрываем попап
        }
    })
})
}
