// Находим все формы и перебираем их
// Вешаем обработчик события submit на каждую форму в переборе
// Внутри каждой формы ищем инпуты
// Перебираем список инпутов конткретной формы и вешаем на каждый инпут обработчик события input
// При наступлении события ввода в инпут проверяем его валидность
// Если инпут не валиден выводи сообещение об ошибке в элемент ошибки и добавляем класс невалидности
// В противном случае удаляем класс и очищаем сообщение+
// Когда блокируем кнопку?

export default class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    }

    _showError(inputElement, errorMessage) { //функция показать ошибку
        inputElement.classList.add(this._config.inputErrorClass) //добавить класс с красной рамкой
        this._formElement.querySelector(`#${inputElement.name}-error`).textContent = errorMessage; //добавить стандартный текст ошибки
    }

    _hideError(inputElement) { //функция скрыть ошибку
        inputElement.classList.remove(this._config.inputErrorClass); //удалить класс с красной рамкой
        this._formElement.querySelector(`#${inputElement.name}-error`).textContent = ''; //удалить стандартный текст ошибки
    }


    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage);
        } else {
          this._hideInputError(inputElement);
        }
      }

    _enableSubmitButton() {
        this._submitButton.classList.remove(this._config.inactiveButtonClass);
        this._submitButton.disabled = false;
    }

    _disableSubmitButton() {
        this._submitButton.classList.add(this._config.inactiveButtonClass);
        this._submitButton.disabled = true;
    }

    _toggleButtonState() {
        const hasInvalidInput = this._inputList.some(inputElement => !inputElement.validity.valid);
        hasInvalidInput ? this._disableSubmitButton() : this._enableSubmitButton();
    }


    _setEventListeners() {
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._toggleButtonState();
        });

        this._formElement.addEventListener('reset', () => {
            this._inputList.forEach(inputElement => {
                this._hideError(inputElement);
            });
            this._disableSubmitButton();
        });

        this._setEventListeners();
        this._toggleButtonState();
    }
}