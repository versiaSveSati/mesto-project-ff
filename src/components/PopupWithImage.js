import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__photo');
    this._caption = this._popup.querySelector('.popup__image-name');
  }

  open(imgSrc, imgCaption) {
    super.open();
    this._image.src = imgSrc;
    this._image.alt = imgCaption;
    this._caption.textContent = imgCaption;
  }
}