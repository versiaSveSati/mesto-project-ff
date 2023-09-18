export default class Card {
    constructor(data, templateSelector, handleOpenCard) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleOpenCard = handleOpenCard;
    }

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content.querySelector('.card') //карточка
            .cloneNode(true);
    }

    createCard() { //создать карточку
        this._element = this._getTemplate();
        this._buttonLike = this._element.querySelector('.card__like'); //нашли кнопку лайка
        this._element.querySelector('.card__photo').src = this._link; //ссылка на картинку
        this._cardImage = this._element.querySelector('.card__photo');// нашли картинку
        this._cardImage.alt = this._name; //картинка
        this._element.querySelector('.card__text').textContent = this._name; //название 
        this._setEventListener();
        return this._element;
    }

    _setEventListener() { //установить слушатель событий
        this._element.querySelector('.card__button').addEventListener('click', () => { //кнопка удалить
            this._handleCardTrash();
        });
        this._buttonLike.addEventListener('click', (event) => { //кнопка сердечко
            this._handleCardLike(event);
        });
        this._cardImage.addEventListener('click', () => { //картинка
            this._handleOpenCard(this._link, this._name);
        });
    }

    _handleCardTrash() {
        this._element.remove();
        this._element = null;
    }

    _handleCardLike(event) {
        this._buttonLike.classList.toggle('card__like_active');
    }
}