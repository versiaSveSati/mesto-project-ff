import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._popupSubtitleAdd = this._popup.querySelector('.popup__subtitle-photo');
        this._popupPictureAdd = this._popup.querySelector('.popup__picture');
    }

    open(link, name) {
        super.open();
        this._popupPictureAdd.src = link;
        this._popupPictureAdd.alt = name;
        this._popupSubtitleAdd.textContent = name;
    }
}