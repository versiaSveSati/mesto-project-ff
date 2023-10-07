export default class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._closeBtnPopup = this._popup.querySelector('.popup__close');
      this._closeBtnByEsc = this._handleEscClose.bind(this);
    }
  
    open() {
      document.addEventListener('keydown', this._closeBtnByEsc);
      this._popup.classList.add('popup_opened');
    }
  
    close() {
      document.removeEventListener('keydown', this._closeBtnByEsc);
      this._popup.classList.remove('popup_opened');
    }
  
    _handleEscClose(event) {
      if (event.key === 'Escape') {
        this.close();
      }
    };
  
    setEventListeners() {
      this._closeBtnPopup.addEventListener('click', () => this.close());
      this._popup.addEventListener('mousedown', (event) => {
        if (event.target === event.currentTarget) {
          this.close();
        }
      });
    }
  }