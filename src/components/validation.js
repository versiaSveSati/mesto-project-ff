// Находим все формы и перебираем их
// Вешаем обработчик события submit на каждую форму в переборе
// Внутри каждой формы ищем инпуты
// Перебираем список инпутов конткретной формы и вешаем на каждый инпут обработчик события input
// При наступлении события ввода в инпут проверяем его валидность
// Если инпут не валиден выводи сообещение об ошибке в элемент ошибки и добавляем класс невалидности
// В противном случае удаляем класс и очищаем сообщение+
// Когда блокируем кнопку?

function showError(inputElement, errorElement, config) { //функция показать ошибку
    inputElement.classList.add(config.inputErrorClass) //добавить класс с красной рамкой
    errorElement.textContent = inputElement.validationMessage; //добавить стандартный текст ошибки
}

function hideError(inputElement, errorElement, config) { //функция скрыть ошибку
    inputElement.classList.remove(config.inputErrorClass) //удалить класс с красной рамкой
    errorElement.textContent = ''; //удалить стандартный текст ошибки
}


function checkInputValidity(inputElement, formElement, config) {
    const isInputValid = inputElement.validity.valid;
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    if(isInputValid) { //если в полевведено некорректное значение
        hideError(inputElement, errorElement, config) //показать ошибку
    } else { 
        showError(inputElement, errorElement, config) //скрыть ошибку
    }
}

function toggleButtonState(buttonElement, isActive, config){ //изменяет состояние кнопки отправки в зависимости от валидности формы. Если форма валидна (isActive === true), кнопка становится активной (включена), иначе она становится неактивной
    if(isActive) {
        buttonElement.disabled = false;
        buttonElement.classList.remove(config.inactiveButtonClass)
    } else {
        buttonElement.classList.add(config.inactiveButtonClass)
        buttonElement.disabled = 'disabled';
    }
}

function setEvenetListener(formElement, config) { //Устанавливает обработчики событий для полей ввода формы и обрабатывает изменения ввода, вызывая соответствующие функции проверки валидности и изменения состояния кнопки
    const inputList = formElement.querySelectorAll(config.inputSelector);
    const submitButtonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(submitButtonElement, formElement.checkValidity(), config);

    [...inputList].forEach(function(inputElement){
        inputElement.addEventListener('input', function(){
            checkInputValidity(inputElement, formElement, config);
            toggleButtonState(submitButtonElement, formElement.checkValidity(), config);
        })
    })
}


function enableValidation(config) {
    const formsList = document.querySelectorAll(config.formSelector);
    [...formsList].forEach(function(formElement){
       setEvenetListener(formElement, config)
    })
}

const configForm = {
    formSelector: ".popup__forms",
    inputSelector: ".popup__form",
    submitButtonSelector: ".popup__save",
    inactiveButtonClass: "popup__save_type_invalid",
    inputErrorClass: "popup__form_type_invalid",
  };

enableValidation(configForm);
