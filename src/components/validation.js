// Находим все формы и перебираем их
// Вешаем обработчик события submit на каждую форму в переборе
// Внутри каждой формы ищем инпуты
// Перебираем список инпутов конткретной формы и вешаем на каждый инпут обработчик события input
// При наступлении события ввода в инпут проверяем его валидность
// Если инпут не валиден выводи сообещение об ошибке в элемент ошибки и добавляем класс невалидности
// В противном случае удаляем класс и очищаем сообщение+
// Когда блокируем кнопку?

// Функция для показа ошибки валидации
function showError(inputElement, errorElement, config) {
    // Добавить класс с красной рамкой к элементу ввода
    inputElement.classList.add(config.inputErrorClass);
    // Установить текст ошибки в элемент ошибки
    errorElement.textContent = inputElement.validationMessage;
}

// Функция для скрытия ошибки валидации
function hideError(inputElement, errorElement, config) {
    // Удалить класс с красной рамкой у элемента ввода
    inputElement.classList.remove(config.inputErrorClass);
    // Очистить текст ошибки в элементе ошибки
    errorElement.textContent = '';
}

// Функция проверки валидности ввода
function checkInputValidity(inputElement, formElement, config) {
    // Проверить, является ли ввод корректным
    const isInputValid = inputElement.validity.valid;
    // Найти элемент ошибки для текущего поля ввода
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    // Если ввод некорректен, показать ошибку, иначе скрыть ее
    if (isInputValid) {
        hideError(inputElement, errorElement, config);
    } else {
        showError(inputElement, errorElement, config);
    }
}

// Функция изменения состояния кнопки отправки
function toggleButtonState(buttonElement, isActive, config) {
    // Если форма валидна, сделать кнопку активной, иначе сделать ее неактивной
    if (isActive) {
        buttonElement.disabled = false;
        buttonElement.classList.remove(config.inactiveButtonClass);
    } else {
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.disabled = 'disabled';
    }
}

// Функция для очистки ошибок валидации и делает кнопку неактивной
function clearValidation(formElement, config) {
    // Получаем все элементы ввода внутри формы
    const inputList = formElement.querySelectorAll(config.inputSelector);
    
    // Получаем элемент кнопки отправки формы
    const submitButtonElement = formElement.querySelector(config.submitButtonSelector);

    // Проходим по каждому полю ввода
    [...inputList].forEach(function(inputElement){
        // Получаем элемент для вывода ошибок валидации, связанный с текущим полем ввода
        const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
        
        // Вызываем функцию скрытия ошибок для очистки видимых ошибок валидации
        hideError(inputElement, errorElement, config);
    });

    // Делаем кнопку неактивной
    toggleButtonState(submitButtonElement, false, config);
}

// Функция установки обработчиков событий для формы
function setEvenetListener(formElement, config) {
    // Найти все поля ввода в форме
    const inputList = formElement.querySelectorAll(config.inputSelector);
    // Найти кнопку отправки формы
    const submitButtonElement = formElement.querySelector(config.submitButtonSelector);
    // Установить начальное состояние кнопки
    toggleButtonState(submitButtonElement, formElement.checkValidity(), config);

    // Для каждого поля ввода установить обработчик события изменения ввода
    [...inputList].forEach(function(inputElement) {
        inputElement.addEventListener('input', function () {
            // Проверить валидность ввода и изменить состояние кнопки
            checkInputValidity(inputElement, formElement, config);
            toggleButtonState(submitButtonElement, formElement.checkValidity(), config);
        });
    });
}

// Функция активации валидации для форм
function enableValidation(config) {
    // Найти все формы, соответствующие селектору
    const formsList = document.querySelectorAll(config.formSelector);
    // Для каждой формы установить обработчики событий и активировать валидацию
    [...formsList].forEach(function (formElement) {
        setEvenetListener(formElement, config);
    });
}

// Экспорт функции enableValidation для возможности использования в других модулях
export { enableValidation, clearValidation };