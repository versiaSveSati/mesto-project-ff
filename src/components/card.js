//клонировать карточку
export function createCard(elements) {
    const cardTemplate = document.querySelector('#elements').content;
    const cardElements = cardTemplate.querySelector('.card').cloneNode(true); //клонировали св-ва
    const cardPhoto = cardElements.querySelector('.card__photo'); //нашли и сохранили картинку в переменную
    const buttonCardDel = cardElements.querySelector('.card__button'); //выбрать кнопку удаления
    cardPhoto.src = elements.link; //добавить ссылку
    cardPhoto.alt = elements.name; //добавить альт
    cardElements.querySelector('.card__text').textContent = elements.name; //добавить название
    cardElements.querySelector('.card__like').addEventListener('click', function (event) { //выбрать лайк
        event.target.classList.toggle('card__like_active'); // переключить лайк
    });

    cardElements.querySelector('.card__photo').addEventListener('click', function () {  //выбрали изображение
        openImagePopup(elements.link, elements.name);  //открыли карточку
    });

    buttonCardDel.addEventListener('click', deletCard); //слушатель удалить картинку

    return cardElements;
}

//удаление карточек
function deletCard(event) {
    const listCardDel = event.target.closest('.card'); //нашли родителя
    listCardDel.remove(); //удалить карточку
} 