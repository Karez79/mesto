const showInputError = (input, errorElement, errorText, errorClass) => {
    input.classList.add(errorClass);
    errorElement.textContent = errorText;
}
const hideInputError = (input, errorElement, errorClass) => {
    input.classList.remove(errorClass);
    errorElement.textContent = "";
}
const disableButton = (submitButton, inactiveButtonClass) => {
    submitButton.classList.remove(inactiveButtonClass,disabled);
}
const enableButton = (submitButton, inactiveButtonClass) => {
    submitButton.classList.add(inactiveButtonClass,disabled);
}

function getTextLengthMessage(input) {
    const length = input.value.length;
    if (input.type === 'url') {
        return 'Введите адрес сайта.'
    } else if (length === 0) {
        return 'Вы пропустили это поле.'
    } else {
        return `Минимальное количество символов: 2. Длина текста сейчас ${length === 1 ? `${length} символ` : `${length} символа` }`
    }
}

const checkInputValidity = (input, textErrorClass, errorClass) => {
    const errorElement = document.querySelector(`${textErrorClass}${input.name}`)
    if (!input.validity.valid) {
        showInputError(input, errorElement, getTextLengthMessage(input), errorClass, input);
    } else {
        hideInputError(input, errorElement, errorClass);
    }
}
function toggleButton (inputList, submitButton, inactiveButtonClass) {
    const inputListArray = [...inputList];
    const noInvalidInputs = inputListArray.filter(input => !input.validity.valid).length === 0;
    if (noInvalidInputs) {
        disableButton(submitButton, inactiveButtonClass);
    } else {
        enableButton(submitButton, inactiveButtonClass);
    }
}

function setEventListeners(inputList, textErrorClass, errorClass, submitButton, inactiveButtonClass) {
    inputList.forEach((input) => {
        input.addEventListener("input", function(e) {
           checkInputValidity(input, textErrorClass, errorClass);
            toggleButton(
               inputList,
               submitButton,
               inactiveButtonClass
           )
        })
    });
}

const enableValidation = (config)=>{
    const forms = document.querySelectorAll(config.formSelector);

    forms.forEach(form => {
        const inputList = form.querySelectorAll(config.inputSelector);
        const submitButton = form.querySelector(config.submitButtonSelector);

        setEventListeners(
            inputList,
            config.textErrorClass,
            config.errorClass,
            submitButton,
            config.inactiveButtonClass
        );
    })

}

enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    textErrorClass: ".popup__input-error_type_",
    errorClass: "popup__input_error",
});
