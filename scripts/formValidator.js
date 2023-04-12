export class FormValidator {
    constructor(config, form) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._textErrorClass = config.textErrorClass;
        this._errorClass = config.errorClass;
        this._form = form;
    }

    _defineElements() {
        this._inputList = this._form.querySelectorAll(this._inputSelector);
        this._submitButton = this._form.querySelector(this._submitButtonSelector);
    }

    _getTextLengthMessage(input) {
        const length = input.value.length;
        if (input.type === 'url') {
            return 'Введите адрес сайта.'
        } else if (length === 0) {
            return 'Вы пропустили это поле.'
        } else {
            return `Минимальное количество символов: 2. Длина текста сейчас ${length === 1 ? `${length} символ` : `${length} символа` }`
        }
    }

    _showInputError (input, errorElement) {
        input.classList.add(this._errorClass);
        errorElement.textContent = this._getTextLengthMessage(input);
    }
    _hideInputError (input, errorElement) {
        input.classList.remove(this._errorClass);
        errorElement.textContent = "";
    }
    _disableButton () {
        this._submitButton.classList.remove(this._inactiveButtonClass);
        this._submitButton.disabled = false;
    }
    _enableButton () {
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.disabled = true;
    }

    _checkInputValidity (input) {
        const errorElement = document.querySelector(`${this._textErrorClass}${input.name}`);
        if (!input.validity.valid) {
            this._showInputError(input, errorElement);
        } else {
            this._hideInputError(input, errorElement);
        }
    }
    _toggleButton () {
        const inputListArray = [...this._inputList];
        const noInvalidInputs = inputListArray.filter(input => !input.validity.valid).length === 0;
        if (noInvalidInputs) {
            this._disableButton();
        } else {
            this._enableButton();
        }
    }

    _setEventListeners() {
        this._inputList.forEach((input) => {
            input.addEventListener("input", () => {
                this._checkInputValidity(input);
                this._toggleButton()
            })
        });
    }

    hideErrors() {
        console.error('hideErrors');
        this._inputList.forEach(input => {
            const errorElement = document.querySelector(`${this._textErrorClass}${input.name}`);
            input.classList.remove(this._errorClass);
            errorElement.textContent = "";
        })
    }

    enableValidation() {
        this._defineElements();
        this._setEventListeners();
    }
}
