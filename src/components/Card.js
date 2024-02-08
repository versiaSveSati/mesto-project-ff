export default class Card {
    constructor({data, ownerId, userId, handleCardClick, handleDeleteIconclick, handleLikeIconClick}, cardsTemplate) {
        this._name = data.name;
        this._link = data.link;
        this._cardId = data._id;
        this._cardLikes = data.likes;
        this._ownerId = ownerId;
        this._userId = userId;
        this._cardsTemplate = cardsTemplate;
        this._handleCardClick = handleCardClick;
        this._handleDeleteIconClick = handleDeleteIconclick;
        this._handleLikeIconClick = handleLikeIconClick;
    }

    _getTemplate() {
        const cardAdd = document.querySelector(this._cardsTemplate).content.querySelector('.elements-grid__item').cloneNode(true);
        return cardAdd;
    }

    createCard() {
        this._card = this._getTemplate();
        this._cardImage = this._card.querySelector('.elements-grid__image');
        this._cardName = this._card.querySelector('.elements-grid__name');
        this._likeButton = this._card.querySelector('.elements-grid__icon');
        this._deleteButton = this._card.querySelector('.elements-grid__delete');
        this._likesNumber = this._card.querySelector('.elements-grid__counter');

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardName.textContent = this._name;
        this.updateLikeNumbers(this._cardLikes);
        this._setEventListeners();
        return this._card;
    }

    cardIsLiked() {
        return this.likesArray.some((user) => user._id === this._userId);
    }

    putLike() {
        this._likeButton.classList.add('elements-grid__icon_like');
    }

    removeLike() {
        this._likeButton.classList.remove('elements-grid__icon_like');
    }

    _changeLikeButtonStatus() {
        if (this.cardIsLiked()) {
            this.putLike();
        } else {
            this.removeLike();
        }
    }

    updateLikeNumbers(data) {
        this.likesArray = data;
        this._likesNumber.textContent = data.length;
        this._changeLikeButtonStatus();
    }

    deleteCard() {
        this._card.remove();
        this._card = null;
    }

    getCardId() {
        return this._cardId;
    }

    _setEventListeners() {
        this._likeButton.addEventListener("click", () => {
            this._handleLikeIconClick();
        });

        if (this._ownerId === this._userId) {
            this._deleteButton.addEventListener("click", () => {
                this._handleDeleteIconClick();
            });
        } else {
            this._deleteButton.remove();
            this._deleteButton = null;
        }

        this._cardImage.addEventListener("click", () => {
            this._handleCardClick(this._link, this._name);
        });
    }
}