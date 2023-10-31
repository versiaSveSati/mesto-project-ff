export default class Popup {
    constructor(popup) {
        this._popup = popup;
        this._popupCloseButton = this._popup.querySelector('.popup__close');
    }

    open() {
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.classList.add('popup_opened');
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.querySelector(".popup__close").addEventListener("click", () => {
            this.close();
        });

        this._popup.addEventListener("mousedown", (evt) => {
            if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains("popup__close")) {
                this.close();
            }
        });
    }
}