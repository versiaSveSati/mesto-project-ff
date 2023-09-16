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
        this._element.querySelector('.card__photo').src = this._link; //ссылка на картинку
        this._element.querySelector('.card__photo').alt = this._name; //картинка
        this._element.querySelector('.card__text').textContent = this._name; //название 
        this._setEventListener();
        return this._element;
    }

    _setEventListener() { //установить слушатель событий
        this._element.querySelector('.card__button').addEventListener('click', () => { //кнопка удалить
            this._handleCardTrash();
        });
        this._element.querySelector('.card__like').addEventListener('click', (event) => { //кнопка сердечко
            this._handleCardLike(event);
        });
        this._element.querySelector('.card__photo').addEventListener('click', () => { //картинка
            this._handleOpenCard(this._link, this._name);
        });
    }

    _handleCardTrash() {
        this._element.remove();
    }

    _handleCardLike(event) {
        event.target.classList.toggle('card__like_active');
    }
}