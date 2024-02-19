//клонировать карточку
export function createCard(elements, openImagePopup) { // передаем openImagePopup в createCard
    const cardTemplate = document.querySelector('#elements').content;
    const cardElements = cardTemplate.querySelector('.card').cloneNode(true); //клонировали св-ва
    const cardPhoto = cardElements.querySelector('.card__photo'); //нашли и сохранили картинку в переменную
    const buttonCardDel = cardElements.querySelector('.card__button'); //выбрать кнопку удаления
    const buttonLike = cardElements.querySelector('.card__like'); //найти кнопку лайка
    cardPhoto.src = elements.link; //добавить ссылку
    cardPhoto.alt = elements.name; //добавить альт
    cardElements.querySelector('.card__text').textContent = elements.name; //добавить название
    
    cardPhoto.onerror = function () {
        // Заменяем сломанное изображение на пустой src (или другое изображение-заглушку)
        cardPhoto.src = ''; 
        cardPhoto.alt = ''; 
    };

    cardPhoto.addEventListener('click', function () {  
        openImagePopup(elements.link, elements.name);  //слушатель открытия изображения
    });
    buttonCardDel.addEventListener('click', deletCard); //слушатель удалить картинку
    buttonLike.addEventListener('click', likeCard); //слушатель поставить лайк
    return cardElements;
}

//функция лайк
function likeCard(event) {
    event.target.classList.toggle('card__like_active'); // переключить лайк
}

//функция удаления карточек
function deletCard(event) {
    const parentCardDel = event.target.closest('.card'); //нашли родителя
    parentCardDel.remove(); //удалить карточку
} 