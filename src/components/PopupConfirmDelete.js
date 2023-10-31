import Popup from "./Popup.js";

export default class PopupConfirmDelete extends Popup {
    constructor(popup) {
        super(popup);
        this._submitButton = this._popup.querySelector('.popup__button_save');
    }

    setSubmitAction(action) {
        this._handleDeleteSubmit = action;
    }

    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._handleDeleteSubmit();
        });
    }
}