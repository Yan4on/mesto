/*окрывает ошибку*/
const showInputError = (settingsValidation, popupElement, inputElement, errorMessage) => {
    const errorElement = popupElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(settingsValidation.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settingsValidation.errorClass);
};

/*Скрывыет ошибку*/
const hideInputError = (settingsValidation, popupElement, inputElement) => {
    const errorElement = popupElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(settingsValidation.inputErrorClass);
    errorElement.classList.remove(settingsValidation.errorClass);
    errorElement.textContent = '';
};

/*Проверка на ошибку*/
const checkInputValidity = (settingsValidation, popupElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(settingsValidation, popupElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(settingsValidation, popupElement, inputElement);
    }
};

/*Ставим обработчи на поля формы*/
const setEventListeners = (settingsValidation, popupElement) => {
    const inputList = Array.from(popupElement.querySelectorAll(settingsValidation.inputSelector));
    const buttonElement = popupElement.querySelector(settingsValidation.submitButtonSelector);
    toggleButtonState(settingsValidation, inputList, buttonElement);

    inputList.forEach((inputElement) => {

        inputElement.addEventListener('input', function () {

            checkInputValidity(settingsValidation, popupElement, inputElement);
            toggleButtonState(settingsValidation, inputList, buttonElement);
        });
    });
};

/*Выполняем проверку форм*/
const enableValidation = (settingsValidation) => {
    const formList = Array.from(document.querySelectorAll(settingsValidation.formSelector));
    formList.forEach((popupElement) => {
        popupElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        setEventListeners(settingsValidation, popupElement);
    });
};

/*Выбираем форуму и ее элементы*/
enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
});


/*Проверяем валидность полей формы*/
function hasInvalidInput(inputList) {

    return inputList.some(function (input) {
        return !input.validity.valid;
    })
}

/*Вкл/Выкл кнопку*/
function toggleButtonState(settingsValidation, inputList, buttonElement) {

    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(settingsValidation.inactiveButtonClass);
        buttonElement.disabled = true; 
    } else {
        buttonElement.classList.remove(settingsValidation.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}